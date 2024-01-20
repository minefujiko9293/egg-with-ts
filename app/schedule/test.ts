import { EggSchedule } from 'egg';
import moment from 'moment';

export default ((app) => {
  return {
    schedule: {
      interval: '2s',
      type: 'worker',
      immediate: true,
      disable: true,
    },

    async task(ctx) {
      app.logger.warn('🚀 ~ task ~ task ~ start_at:', moment().format('YYYY-MM-DD HH:mm:ss'));
      await app.utils.testSleep(5);
      app.logger.warn('🚀 ~ task ~ task ~ ok_at:', moment().format('YYYY-MM-DD HH:mm:ss'));
    },
  };
}) as EggSchedule;
