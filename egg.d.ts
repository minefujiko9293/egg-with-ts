import * as bullmq from 'bullmq';
import 'egg';

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

  interface EggAppConfig extends EggAppConfigCustom {}
  interface EggAppConfigCustom {
    _dev_: boolean;

    bullmq: {
      connection: bullmq.RedisOptions;
    };
  }

  interface Application {
    _bullmq: bullmq;
    bullmq: {
      [x: string]: { queue: bullmq.Queue; worker: bullmq.Worker };
    };
  }
}
