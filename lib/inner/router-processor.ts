import { Router, RequestHandler, Application } from 'express'


// T extends ApiController

export function routerProcessor(routing: Array<[string, Application]>): Router;
export function routerProcessor(routing: Array<[string, ...Array<RequestHandler>]>): Router;
export function routerProcessor(routing: Array<[string, Router]>): Router {
    return routing.reduce((router: Router, [path, ...handlers]) => router.use(path, ...handlers), Router())
}

