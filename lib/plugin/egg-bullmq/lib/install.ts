import { Agent, Application, EggAppConfig } from 'egg';

export async function init(app: Application | Agent) {
  await inject(app.config);

  console.log('init bullmq');
}

async function inject(config: EggAppConfig) {
  const { redis } = config.bullmq;
  console.warn('🚀 ~ inject ~ redis:', redis);
}
