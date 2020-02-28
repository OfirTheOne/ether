

import { guardToRequestHandler } from './guard-to-request-handler';
import { middlewareFactory } from './../factory/middleware';

export function guardToMiddleware(guardClass: any) {
    const guardHandler = guardToRequestHandler(guardClass);
    return middlewareFactory(guardHandler);

}