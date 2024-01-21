import * as bullmq from 'bullmq';
import { Application } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export async function setup(app: Application) {
  app._bullmq = bullmq;
  app.bullmq = {};

  let connection = app.config.bullmq?.connection;
  if (!connection) {
    if (app.redis?.options) {
      connection = {
        db: app.redis.options.db!,
        host: app.redis.options.host!,
        port: app.redis.options.port!,
        password: app.redis.options.password!,
      };
    }
  }

  await install(app, connection);
}

async function install(app: Application, connection: bullmq.RedisOptions) {
  const queueDir = path.join(__dirname, 'queue');
  try {
    const files = await fs.promises.readdir(queueDir);
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(queueDir, file);

        // 检查文件是否是 TypeScript 文件
        if (filePath.endsWith('.ts') && !filePath.endsWith('.d.ts')) {
          // 动态导入并执行文件
          try {
            const module = await import(filePath.replace(/\.ts$/, ''));

            const result = module.default && module.default(app, connection);
            if (result) {
              app.bullmq[module.queue_name] = {
                queue: result.queue,
                worker: result.worker,
              };
            }
          } catch (error) {
            console.error(`Error importing ${file}:`, error);
          }
        }

        // 对于非 TypeScript 文件或声明文件，返回一个 resolved promise
        return Promise.resolve();
      }),
    );
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}
