import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};

  config.bullmq = {
    app: true,
    agent: false,
    dir: 'bullmq',
  };

  return { ...config };
};
