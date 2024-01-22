import * as bullmq from 'bullmq';
import 'egg';

declare module 'egg' {
  export type EggSchedule = (app: Application) => {
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
  export interface EggAppConfigCustom {
    _dev_: boolean;

    bullmq: {
      connection: bullmq.RedisOptions;
    };
  }

  interface Application {
    bullmq: {
      [x: string]: { queue: bullmq.Queue; worker: bullmq.Worker };
    };
  }
}
