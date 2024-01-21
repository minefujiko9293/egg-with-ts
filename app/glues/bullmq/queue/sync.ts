import { Queue, RedisOptions, Worker } from 'bullmq';
import { Application } from 'egg';

export const queue_name = 'sync1';
export default function register(app: Application, connection: RedisOptions = {}) {
  const queue = new Queue(queue_name, {
    connection,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
  });

  const worker = new Worker(
    queue_name,
    async (job) => {
      console.warn('🚀 ~ :', job.data);

      return;
    },
    { connection },
  );

  return { queue, worker };
}
