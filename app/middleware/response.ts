import { Context } from 'egg';

export class MyError extends Error {
  private _my_error_code: number;
  constructor(message: string, _my_error_code = 500) {
    super(message);
    this._my_error_code = _my_error_code;
  }
}

export default function response_middleWare(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    let errcode = 0;
    let errmsg = 'ok';
    let result = null;

    try {
      result = await next();
    } catch (error: any) {
      // if (ctx.app.config.env === 'local') {
      //   throw error;
      // }

      console.warn('🚀 ~ response middleware ~ catch:', error);
      errcode = error?._my_error_code ?? 500;
      errmsg = error.toString();
    }

    const _method = ctx.request.method;
    const _path = ctx.request.path;
    const _router_match = ctx.app.router.match(_path, _method);
    const _is_router_matched = _router_match.route;
    // console.warn('🚀 ~ response middleware ~ _router_match:', {
    //   method: _method,
    //   path: _path,
    //   match: _router_match,
    // });

    if (!_is_router_matched) {
      ctx.response.status = 404;
      ctx.response.body = '<h1>404 Not Found</h1>';
    } else {
      ctx.response.status = 200;
      ctx.response.body = {
        errcode,
        errmsg,
        data: result,
      };
    }
  };
}
