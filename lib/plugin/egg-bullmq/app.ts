import { Application, IBoot } from 'egg';
import { init } from './lib/install';

export default class Boot implements IBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    if (this.app.config.bullmq?.app) {
      init(this.app);
    }
  }
}
