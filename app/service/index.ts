import { Service } from 'egg';

export class TestClass {
  public a?: string = undefined;
  public b?: string = undefined;
}

export default class IndexService extends Service {
  index() {
    const instance = new TestClass();

    instance.a = 'aa';
    instance.b = '1';

    return instance;
  }
}
