import { Application } from 'egg';
import * as utils from './utils';

export default {
  utils,

  getEnv(this: Application) {
    const env = this.config.env;
    console.log(env);
    return env;
  },
};
