import { Agent, IBoot } from 'egg';

export default class Boot implements IBoot {
  app: Agent;

  constructor(app: Agent) {
    this.app = app;
  }

  async serverDidReady() {
    // TODO: something...
  }
}
