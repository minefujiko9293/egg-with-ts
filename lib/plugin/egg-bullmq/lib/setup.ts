import { Agent, Application } from 'egg';
import path from 'path';

export function setup(app: Application | Agent) {
  _init(app);

  console.log(app.bullmq);

  console.log('🚀 ~ bullmq installed:', app.type);
}

function _init(app: Application | Agent) {
  const { redis, dir } = app.config.bullmq;
  if (!redis) throw new Error('bullmq redis config missing!');

  const _dir = path.join(app.baseDir, 'app', dir!);
  // console.log('🚀 ~ inject ~ redis:', redis, dir);

  app.loader.loadToApp(_dir, 'bullmq', {
    filter(target) {
      console.log('!!!', typeof target);

      return true;
    },
    inject: {
      redis,
    },
    // initializer(target: any, opt) {
    //   console.warn('🚀 ~ initializer ~ target:', target);
    //   return target(redis);
    // },
  });
}
