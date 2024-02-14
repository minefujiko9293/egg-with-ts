import { modelOptions, prop } from '@qq877008992/egg-typegoose';
import { _mongo_sync_base } from '../_base';

@modelOptions({ schemaOptions: { collection: 'zsga_dept' } })
export class zsga_dept extends _mongo_sync_base {
  @prop()
  public name!: string;

  @prop({ default: null })
  public title!: string;
}
