import { modelOptions, prop } from '@qq877008992/egg-typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: '_created_at', updatedAt: '_updated_at' },
    minimize: false,
  },
})
export abstract class _mongo_base {
  @prop({ index: true })
  _created_at!: number;

  @prop()
  _updated_at!: number;
}

export abstract class _mongo_sync_base extends _mongo_base {
  @prop({ default: null })
  _sync_updated_at?: number;
}
