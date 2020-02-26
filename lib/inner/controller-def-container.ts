
import { Router, RequestHandler } from "express";
import { GuardFn } from "../models/guard";
import { RouteWrapperHandler } from '../models/route-wrapper-handler';

import { wrapperApplier } from './../common/factory/route-wrapper'

export interface ControllerMethodDefinition { 
    route: string, 
    apiMethod: ApiMethod , 
    middlewares: Array<RequestHandler>, 
    wrappers: Array<RouteWrapperHandler>,
    validators: Array<RequestHandler>, 
    classMethodName: string 
}
export type ApiMethod = 'POST'|'GET'|'PUT'|'DELETE'|'PATCH'|'ALL';

export class ControllerDefContainer {

    gourds: Array<GuardFn>
    methodDefinitionsMap = new Map<string, ControllerMethodDefinition>()
    path: string = '/';


    constructor() {}

    addMiddleware(cb: RequestHandler, classMethodName: string) {
        if(this.methodDefinitionsMap.has(classMethodName)) { 
            const def = this.methodDefinitionsMap.get(classMethodName);
            def.middlewares.push(cb);
            this.methodDefinitionsMap.set(classMethodName, def);
        }
    }

    addWrapper(cb: RouteWrapperHandler ,classMethodName: string) {
        if(this.methodDefinitionsMap.has(classMethodName)) { 
            const def = this.methodDefinitionsMap.get(classMethodName);
            def.wrappers.push(cb);
            this.methodDefinitionsMap.set(classMethodName, def);
        }
    }
    public setPath(path: string) {
        this.path = path;
    }
    public addMethod(route: string, validators: Array<RequestHandler>, apiMethod: ApiMethod, classMethodName: string) {
        this.methodDefinitionsMap.set(
            classMethodName, 
            {
                middlewares: [],
                wrappers: [],
                route, 
                validators, 
                classMethodName, 
                apiMethod
            }
        );
    }


    private applyWrappers(originMethod: Function, wrappers: Array<RouteWrapperHandler>) {
        return wrappers.reduce((origin, wrapper) => {
            return wrapperApplier(origin as any, wrapper);
        }, originMethod)
        
    }
    public initRouter(router: Router, classContext: any ) {

        const controllerRouter = Router();
        Array.from(this.methodDefinitionsMap.values()).forEach(m => {

            const apiMethod = String(m.apiMethod).toLowerCase();
            const classMethodFunction: Function = classContext[m.classMethodName];
            
            const requestMethod = (m.wrappers && m.wrappers.length > 0) ? 
                this.applyWrappers(classMethodFunction, m.wrappers):
                classMethodFunction;
            
            if(classMethodFunction) {
                const boundClassMethod = requestMethod.bind(classContext);
                controllerRouter[apiMethod](
                    m.route, 
                    ...m.middlewares, 
                    ...m.validators,
                    boundClassMethod 
                );
            } else {
                // console.log(classMethodFunction)
            }
        });
        return router.use(this.path, controllerRouter);
    }


}