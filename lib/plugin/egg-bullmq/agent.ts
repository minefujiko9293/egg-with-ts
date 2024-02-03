import { Agent, IBoot } from 'egg';
import { init } from './lib/install';

export default class Boot implements IBoot {
  app: Agent;

  constructor(app: Agent) {
    this.app = app;
  }

  async didLoad() {
    if (this.app.config.bullmq?.agent) {
      init(this.app);
    }
  }
}
