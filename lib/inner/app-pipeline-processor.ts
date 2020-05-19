import { Application } from "express";
import { Ctor } from "../models";
import { AppPipelineResolver } from "./app-pipeline-resolver";



export function appPipelineProcessor(app: Application, appPipelineClass: Ctor<any>): Application {

    const resolver = new AppPipelineResolver(appPipelineClass)

    const pipeHandler = resolver.getPipeFn()

    return pipeHandler(app)

}
