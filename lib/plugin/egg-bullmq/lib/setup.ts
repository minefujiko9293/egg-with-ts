import { Queue, Worker } from 'bullmq';
import { Agent, Application } from 'egg';
import path from 'path';

export function setup(app: Application | Agent) {
  _init(app);

  console.log('🚀 ~ bullmq installed:', app.type);
}

function _init(app: Application | Agent) {
  const { redis, dir } = app.config.bullmq;
  if (!redis) throw new Error('bullmq redis config missing!');

  const _dir = path.join(app.baseDir, 'app', dir!);
  // console.log('🚀 ~ inject ~ redis:', redis, dir);

  app.loader.loadToApp(_dir, 'bullmq', {
    initializer(target: any, opt) {
      console.log('🚀 ~ initializer ~ target:', target, opt);

      const { queue_name, defaultJobOptions = {}, handler } = target;

      return {
        queue_name,
        queue: new Queue(queue_name, {
          connection: redis,
          defaultJobOptions,
        }),
        worker: new Worker(queue_name, handler, {
          connection: redis,
        }),
      };
    },
  });
}
