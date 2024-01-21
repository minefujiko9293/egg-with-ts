import { Agent, Application, IBoot } from 'egg';
import { setup } from './app/glues/bullmq';

export default class Boot implements IBoot {
  app: Agent;

  constructor(app: Agent) {
    this.app = app;
  }

  async didReady() {
    // setup bullmq
    await setup(this.app as Application);

    // TODO: something...
  }
}
