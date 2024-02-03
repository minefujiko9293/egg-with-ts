import * as bullmq from 'bullmq';
import { Application } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export async function setup(app: Application) {
  app.bullmq = {};

  let connection = app.config.bullmq?.redis;
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
    const modules = Array.from(
      new Set(
        (await fs.promises.readdir(queueDir)).map((file) =>
          path.join(queueDir, file.replace(/\.[^.]+$/, '')),
        ),
      ),
    );

    await Promise.all(
      modules.map(async (_module) => {
        // 动态导入并执行文件
        try {
          const module = await import(_module);
          const result = module.default && module.default(app, connection);
          if (result) {
            app.bullmq[module.queue_name] = {
              queue: result.queue,
              worker: result.worker,
            };
          }
        } catch (error) {
          console.error(`Error importing ${_module}:`, error);
        }
      }),
    );
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}
