import { RequestHandler } from 'express'
import { ControllerDefContainer, ApiMethod } from '../../inner/controller-def-container';


function ApiMethodFactory(route: string, method: ApiMethod, validators: (Array<RequestHandler> | RequestHandler) = []) {
    return (targetPrototype: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
        
        // apply only on methods defined in a Controller
        let routerDef: ControllerDefContainer = targetPrototype['$router_def'];

        if(routerDef == undefined) {
            targetPrototype['$router_def'] = new ControllerDefContainer();
            routerDef = targetPrototype['$router_def'];
        } 
        const validatorsAsArray = Array.isArray(validators)? validators: [validators];
        routerDef.addMethod(route, validatorsAsArray, method, propertyName);

        return propertyDescriptor;
    }
}

export function Post(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = []) {
    return ApiMethodFactory(route, 'POST', middlewares);
}

export function Get(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = []) {
    return ApiMethodFactory(route, 'GET', middlewares);
}

export function Delete(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = []) {
    return ApiMethodFactory(route, 'DELETE', middlewares);
}

export function Put(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = []) {
    return ApiMethodFactory(route, 'PUT', middlewares);
}

export function All(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = []) {
    return ApiMethodFactory(route, 'ALL', middlewares);
}

