import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    keys: appInfo.name + '123456',

    middleware: ['response'],

    logrotator: { maxDays: 2 },
    logger: { dir: path.join(appInfo.baseDir, 'logs') },

    validate: { convert: true },

    cors: { origin: '*' },
  };

  const myConfig = {
    my1: {
      pageSize: 30,
      serverUrl: 'https://hacker-news.firebaseio.com/v0',
    },
    my2: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  return {
    ...(config as {}),
    ...myConfig,
  };
};
