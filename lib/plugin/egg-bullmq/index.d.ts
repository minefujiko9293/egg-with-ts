import * as bullmq from 'bullmq';
import 'egg';

export * from 'bullmq';
export * from './lib/index';

declare module 'egg' {
  interface EggAppConfig {
    bullmq: {
      app?: boolean;
      agent?: boolean;
      dir?: string;
      redis?: bullmq.RedisOptions;
    };
  }

  interface Application extends _usingBullmq {}

  interface Agent extends Partial<_usingBullmq> {}
}

type _usingBullmq = {
  bullmq: {
    [key: string]: {
      queue_name: string;
      queue: bullmq.Queue;
      worker: bullmq.Worker;
    };
  };
};
