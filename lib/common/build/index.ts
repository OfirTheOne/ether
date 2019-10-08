import { Router } from "express";
import { moduleProcessor } from "../../inner/module-processor";

export function build(appModule: any): Router {

    return moduleProcessor(appModule);

}