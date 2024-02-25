import { mongoose } from '@minefujiko9293/egg-typegoose';
import { Controller } from 'egg';
import { zsga_dept } from '../entity/mongodb/zsga/zsga_dept';
import { MyError } from '../middleware/response';

export default class HomeController extends Controller {
  private zsga_dept_model = this.app.injectTypegooseModel(zsga_dept);

  public async test_route() {
    const { fun } = this.ctx.params;
    if (!fun) throw new Error('fun param missing!');
    if (!this[fun]) throw new MyError('notfound', 404);

    return this[fun]();
  }

  public async test() {
    const { app } = this;

    const conn = app.typegoose.getConn();

    const b = mongoose.connection === conn;
    console.warn('🚀 ~ HomeController ~ test ~ b:', b);

    return mongoose.connections.map((i) => i.readyState);
  }

  public async test1() {
    const session = await this.zsga_dept_model.db.startSession();
    try {
      session.startTransaction();

      const [result] = await this.zsga_dept_model.insertMany([{ name: 'dept1' }], { session });
      result.set({ name: 'hahaha' });
      await result.save();

      await session.commitTransaction();
      return result;
    } catch (err) {
      if (session) await session.abortTransaction();
      throw err;
    } finally {
      if (session) session.endSession();
    }
  }
}
