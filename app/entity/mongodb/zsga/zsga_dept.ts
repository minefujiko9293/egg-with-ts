import { modelOptions, prop } from '@minefujiko9293/egg-typegoose';
import { _mongo_sync_base } from '../_base';

@modelOptions({ schemaOptions: { collection: 'zsga_dept' } })
export class zsga_dept extends _mongo_sync_base {
  @prop()
  public name!: string;

  @prop({ default: null })
  public title!: string;
}
