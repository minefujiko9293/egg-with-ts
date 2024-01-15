import { Application, Context } from 'egg';

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
