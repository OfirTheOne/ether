import { RequestHandler } from "express";
import { ControllerDefContainer } from "../../../inner/controller-def-container";

export function middlewareFactory(handler: RequestHandler, context?: any) {
    return function () {
        return (targetPrototype: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
            // apply only on methods defined in a Controller
            let routerDef: ControllerDefContainer = targetPrototype['$router_def'];
            
            if(routerDef == undefined) {
                targetPrototype['$router_def'] = new ControllerDefContainer();
                routerDef = targetPrototype['$router_def'];
            } 
            let cb = context? handler.bind(context) : handler;
            routerDef.addMiddleware(cb, propertyName);
            
            return propertyDescriptor;
        }
    }
    

}