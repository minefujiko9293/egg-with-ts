import { Agent, IBoot } from 'egg';
import { SYNC_BOTH_COLL_LIST } from './app/entity/mongodb/_sync_list';

export default class Boot implements IBoot {
  app: Agent;

  constructor(app: Agent) {
    this.app = app;
  }

  async serverDidReady() {
    // TODO: something...

    const { config } = this.app;
    const redis = this.app.redis!;
    const typegoose = this.app.typegoose!;

    const { db } = typegoose.getConn();

    const token_key = `${config.keys}_changeStream_token`;
    const resume_token = await redis.get(token_key);
    const resumeAfter = resume_token ? { _data: resume_token } : undefined;

    db.watch([], { resumeAfter }).on('change', async (data: any) => {
      console.warn('🚀 ~ Boot ~ db.watch ~ data:', data);

      const { ns, documentKey, operationType, _id } = data;
      const { coll }: { coll: string } = ns;

      if (SYNC_BOTH_COLL_LIST.includes(coll)) {
        console.warn('🚀 ~ Boot ~ db.watch ~ coll:', coll);

        // save resumeToken
        redis.set(token_key, _id._data);
      }
    });
  }
}
