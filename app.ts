import { Application } from 'egg';

export default class AppBoot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    // TODO: something...
  }
}
