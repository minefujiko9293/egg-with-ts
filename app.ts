import { Application, IBoot } from 'egg';
import { setup } from './app/glues/bullmq';

export default class Boot implements IBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didReady() {
    // TODO: something...

    // setup bullmq
    await setup(this.app);
  }
}
