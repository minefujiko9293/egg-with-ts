import { BullmqQueue } from '../../../lib/plugin/egg-bullmq';

export default ((app) => {
  return {
    queue_name: 'sync',
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
    handler: async (job) => {
      console.warn('🚀 ~ sync - handler:', app.type, job.data);

      return;
    },
  };
}) as BullmqQueue;
