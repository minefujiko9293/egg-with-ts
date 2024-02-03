import path from 'path';

export default {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },

  bullmq: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-bullmq'),
  },
};
