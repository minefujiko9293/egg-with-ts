import { Application, IBoot } from 'egg';

export default class Boot implements IBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didReady() {
    // TODO: something...
  }
}
