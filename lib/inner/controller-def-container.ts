import { RequestHandler } from "express-serve-static-core";
import { Router } from "express";
import { GuardFn } from "../models/guard";

export interface ControllerMethodDefinition { 
    route: string, 
    apiMethod: ApiMethod , 
    middlewares: Array<RequestHandler>, 
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
    public setPath(path: string) {
        this.path = path;
    }
    public addMethod(route: string, validators: Array<RequestHandler>, apiMethod: ApiMethod, classMethodName: string) {
        this.methodDefinitionsMap.set(
            classMethodName, 
            {
                middlewares: [],
                route, 
                validators, 
                classMethodName, 
                apiMethod
            }
        );
    }


    public initRouter(router: Router, classContext: any ) {

        const controllerRouter = Router();
        Array.from(this.methodDefinitionsMap.values()).forEach(m => {

            const apiMethod = String(m.apiMethod).toLowerCase();
            const classMethodFunction: Function = classContext[m.classMethodName];
            
            if(classMethodFunction) {
                const boundClassMethod = classMethodFunction.bind(classContext);
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