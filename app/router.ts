import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/test/do/:fun', controller.home.test_route);

  router.get('/mongo/do/:fun', controller.mongo.test_route);
};
