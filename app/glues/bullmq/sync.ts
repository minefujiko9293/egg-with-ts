export default {
  queue_name: 'sync',
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
  handler: async (job) => {
    console.warn('🚀 ~ sync - handler:', job.data);

    return;
  },
} as any;
