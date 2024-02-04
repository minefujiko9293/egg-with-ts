import { Application } from 'egg';

export default (app: Application) => {
  return {
    queue_name: 'sync',
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
    handler: async (job) => {
      console.log('🚀 !!', app.type);

      console.warn('🚀 ~ sync - handler:', job.data);

      return;
    },
  };
};
