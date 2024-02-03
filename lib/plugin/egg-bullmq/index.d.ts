import * as bullmq from 'bullmq';
import 'egg';

declare module 'egg' {
  interface EggAppConfig {
    bullmq: {
      app?: boolean;
      agent?: boolean;
      dir?: string;
      redis?: bullmq.RedisOptions;
    };
  }

  interface Application extends using_bullmq {}

  interface Agent extends Partial<using_bullmq> {}
}

type using_bullmq = {
  bullmq: {
    [key: string]: { queue: bullmq.Queue; worker: bullmq.Worker };
  };
};
