import 'egg';
import { Redis } from 'ioredis';

declare module 'egg' {
  type EggSchedule = (app: Application) => {
    schedule: {
      type: 'all' | 'worker';
      interval?: string;
      cron?: string;
      cronOptions?: any;
      immediate?: boolean;
      disable?: boolean;
      env?: string[];
    };
    task: (ctx: Context) => Promise<void>;
  };

  interface EggAppConfig {
    _dev_: boolean;
  }

  interface Agent {
    redis?: Redis;
  }

  interface Application {}
}
