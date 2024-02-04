import { Agent, IBoot } from 'egg';
import { setup } from './lib/setup';

export default class Boot implements IBoot {
  app: Agent;

  constructor(app: Agent) {
    this.app = app;
  }

  async didLoad() {
    if (this.app.config.bullmq?.agent) {
      setup(this.app);
    }
  }
}
