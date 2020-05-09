import { Router } from "express";
import { Ctor } from "../models";
import { ControllerDefContainer } from "../inner/controller-def-container";
import { Injector } from './di/injector';

const injector = Injector.create();

export function controllerProcessor(router: Router, Controller: Ctor<any>): Router {
    let controllerDef: ControllerDefContainer = ControllerDefContainer.extractControllerDefContainer(Controller);

    const { extendsControllers } = controllerDef;

    for(let extendsController of extendsControllers) {
        controllerProcessor(router, extendsController);
    }

    const controllerInstance = injector.resolve(Controller);

    controllerDef.initRouter(router, controllerInstance);
    return router;
}

