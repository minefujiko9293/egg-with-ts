import { Controller } from 'egg';
import { MyError } from '../middleware/response';

export default class HomeController extends Controller {
  public async index() {
    return 'hello, egg with ts!';
  }

  public async test_route() {
    const { fun } = this.ctx.params;
    if (!fun) throw new Error('fun param missing!');
    if (!this[fun]) throw new MyError('notfound', 404);

    return this[fun]();
  }

  public async test1() {
    return this.service.index.index();
  }

  public async test2() {
    throw new MyError('test2 notfound', 404);
  }

  public async test3() {
    this.app.redis.set('test3', 10086);

    return this.app.redis.get('test3');
  }

  public async test4() {
    const { queue_name, queue } = this.app.bullmq.sync;
    console.warn('🚀 ~ HomeController ~ test4 ~ queue_name:', queue_name);
    const job = await queue.add(queue_name, { foo: 'bar' });
    return job.id;
  }
}
