import * as bullmq from 'bullmq';
import { Agent, Application } from 'egg';

export * from 'bullmq';
export type BullmqQueue = (app: Application | Agent) => {
  queue_name: string;
  defaultJobOptions: Partial<bullmq.DefaultJobOptions>;
  handler: bullmq.Processor;
};
