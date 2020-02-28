
import { ModuleGuardContainer } from './../../inner/module-guard-container';


export function guardToRequestHandler(gourdClass: any) {
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
    };
    return gourdHandler;
}