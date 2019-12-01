

import { ControllerDefContainer } from '../../../inner/controller-def-container';
import { RouteWrapperHandler } from '../../../models/route-wrapper-handler';

export function TryCatch(errorHandler: ((e: any, next: Function) => void) = (e, next) => next(e)) {
        return (targetPrototype: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
            // apply only on methods defined in a Controller
            let routerDef: ControllerDefContainer = targetPrototype['$router_def'];
            
            if(routerDef == undefined) {
                targetPrototype['$router_def'] = new ControllerDefContainer();
                routerDef = targetPrototype['$router_def'];
            } 
            routerDef.addWrapper(
                _tryCatchHandler(errorHandler), 
                propertyName
            );
            
            return propertyDescriptor;
        }
}


function _tryCatchHandler(errorHandler: ((e: any, next: Function) => void)): RouteWrapperHandler {

    return function(currentRequestHandler, req, res, next) {
        try {
            currentRequestHandler(req, res, next)
        } catch (error) {
            errorHandler(error, next)
        }
    }

}
