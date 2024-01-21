import { EggAppConfig, PowerPartial } from 'egg';

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
};
