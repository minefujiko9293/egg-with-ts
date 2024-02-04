import { Application, IBoot } from 'egg';
import { setup } from './lib/setup';

export default class Boot implements IBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    if (this.app.config.bullmq?.app) {
      setup(this.app);
    }
  }
}
