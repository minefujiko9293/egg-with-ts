import { BullmqQueue } from '@minefujiko9293/egg-bullmq';

export default ((app) => {
  return {
    queue_name: 'sync',
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
    handler: async (job) => {
      console.warn('🚀 ~ sync - handler:', app.type, job.id, job.data);

      return;
    },
  };
}) as BullmqQueue;
