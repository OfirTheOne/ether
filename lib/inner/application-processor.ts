
import * as express from "express";
import { Router, Application } from "express";

import { controllerProcessor } from "./controller-processor";
import { gourdProcessor} from './guard-processor';
import { subModuleProcessor } from "./module-processor";
import { errorHandlerProcessor } from "./error-handler-processor";

import { ApplicationOptions } from "../models";
import { MetaInput } from "./consts";
import { appPipelineProcessor } from "./app-pipeline-processor";

export function applicationProcessor(applicationClass: any): Application {

    const params: ApplicationOptions = applicationClass.prototype[MetaInput.application];

    let  { 
        pipelines = {},
        guards = [],
        controllers = [], 
        errorHandlers = [],
        modules = [], 
    } = params;

    let onCreateRouter = Router();
    let afterRoutesInitRouter = Router();

    let app: Application = express(); 

    // <= on create
    app = (pipelines['onCreate'] || []).reduce((_app, pipe) => appPipelineProcessor(_app, pipe), app);

    onCreateRouter = guards.reduce((accRouter, guard) => gourdProcessor(accRouter, guard) , onCreateRouter);

    onCreateRouter = controllers.reduce((accRouter, controller) => controllerProcessor(accRouter, controller) , onCreateRouter);  

    onCreateRouter = modules.reduce((accRouter, subModule) => subModuleProcessor(accRouter, subModule), onCreateRouter);

    app.use(onCreateRouter);
     
    // <=  after routes init
    app = (pipelines['afterRoutesInit'] || []).reduce((_app, pipe) => appPipelineProcessor(_app, pipe), app);

    afterRoutesInitRouter = errorHandlers.reduce<Router>((accRouter, errorHandler) => errorHandlerProcessor(accRouter, errorHandler), afterRoutesInitRouter);

    app.use(afterRoutesInitRouter);
    
    return app;
    
}


// function errorHandlerProcessor(router: Router, errorHandler: any): Router {
//     return Array.isArray(errorHandler) ? 
//         router.use(errorHandler[0], errorHandler[1]) :
//         router.use(errorHandler);
// } 