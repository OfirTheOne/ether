import { Router } from "express";
import { ModuleGuardContainer } from './module-guard-container';
import { Ctor } from "../models";


export function gourdProcessor(router: Router, gourdClass: Ctor<any>) {

    const guardContainer = new ModuleGuardContainer(gourdClass);
    const gourdHandler = async (req, res, next) => {
        try {
            
            const guardResult = await (guardContainer.getGuardFn()(req, res));
            if(guardResult == false) {
                next('guard failed');
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    router.all('*', gourdHandler);
    return router;
}
