import { Application } from 'egg';

export default class AgentBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    // TODO: something...
  }
}
