import { Router } from "express";
import { Ctor } from "../models";
import { ControllerDefContainer } from "../inner/controller-def-container";
import { Injector } from './di/injector';

const injector = Injector.create();

export function controllerProcessor(router: Router, Controller: Ctor<any>): Router {
    let controllerDef: ControllerDefContainer = Controller.prototype['$router_def'];
    // const controllerInstance = new Controller();
    const controllerInstance = injector.resolve(Controller);
    controllerDef.initRouter(router, controllerInstance);
    return router;
}

