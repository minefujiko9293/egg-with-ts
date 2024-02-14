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

  typegoose: {
    app: true,
    agent: true,
    default: {
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: true,
        autoIndex: true,
        useCreateIndex: true,
      },
    },
    clients: {
      default: {
        url: 'mongodb://127.0.0.1:27017',
        options: {
          dbName: 'egg-with-ts',
          authSource: 'admin',
          auth: { user: 'mongodb', password: 'mongodb' },
        },
      },
      db2: {
        url: 'mongodb://127.0.0.1:27017',
        options: {
          dbName: 'egg-with-ts1',
          authSource: 'admin',
          auth: { user: 'mongodb', password: 'mongodb' },
        },
      },
    },
  },
};
