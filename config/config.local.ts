import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.my1 = {
    pageSize: 20,
  };

  return config;
};
