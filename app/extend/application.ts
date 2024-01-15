import { Application } from 'egg';
import * as utils from './utils';

export default {
  utils,

  getEnv(this: Application) {
    console.log(this.config.env);
  },
};
