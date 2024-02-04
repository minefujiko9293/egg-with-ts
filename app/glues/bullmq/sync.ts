import { Queue, RedisOptions, Worker } from '../../../lib/plugin/egg-bullmq/lib';

export default (connection: RedisOptions) => {
  console.warn('🚀 ~ connection:', connection);

  const queue_name = 'sync';

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

  return { queue_name, queue, worker };
};
