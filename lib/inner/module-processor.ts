
import { ModuleParameters } from "../models";
import { Router } from "express";
import { controllerProcessor } from "./controller-processor";
import { gourdProcessor} from './guard-processor';

export function moduleProcessor(moduleClass: any) {

    const params: ModuleParameters = moduleClass.prototype['$module_params'];

    let  { 
        path, 
        guards = [],
        controllers = [], 
        // providers = [], 
        modules = [], 
    } = params;

    let router = Router();
    
    
    router = guards.reduce((accRouter, guard) => gourdProcessor(accRouter, guard) , router);
    
    router = controllers.reduce((accRouter, controller) => controllerProcessor(accRouter, controller) , router);
    
    router = modules.reduce((accRouter, subModule) => subModuleProcessor(accRouter, subModule), router);
    
    if(path != undefined && path != "" && typeof path == 'string') {
        router = Router().use(path, router);
    }
        

    return router;
    
}


function subModuleProcessor(router: Router, moduleClass: any): Router {
    const moduleRouter = moduleProcessor(moduleClass);
    return router.use(moduleRouter);
}