import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';
import { config as devSourceConfig } from './source/dev';
import { config as prodSourceConfig } from './source/prod';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    keys: appInfo.name + '123456',

    middleware: ['response'],

    logrotator: { maxDays: 2 },
    logger: { dir: path.join(appInfo.baseDir, 'logs') },

    validate: { convert: true },

    cors: { origin: '*' },
  };

  config._dev_ = true;

  const source = config._dev_ ?? true ? devSourceConfig : prodSourceConfig;

  return {
    ...(config as {}),
    ...(source as {}),
  };
};
