import { EggAppConfig, PowerPartial } from 'egg';
import path from 'path';

export const config: PowerPartial<EggAppConfig> = {
  redis: {
    agent: true,
    client: {
      db: 0,
      port: 6379,
      host: '127.0.0.1',
      password: '',
      keyPrefix: 'egg-with-ts',
    },
  },

  bullmq: {
    agent: true,
    app: true,
    dir: path.join('glues', 'bullmq'),
    redis: {
      db: 0,
      port: 6379,
      host: '127.0.0.1',
      password: '',
    },
  },
};
