import { ControllerDefContainer } from "../../inner/controller-def-container";
import { Ctor } from "../../models";


export function Controller(params: {path: string} = { path: '/'}) {
    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        original.prototype['$meta.type'] = '@Controller';

        let controllerDef: ControllerDefContainer = original.prototype['$router_def'];

        if(controllerDef == undefined) {
            original.prototype['$router_def'] = new ControllerDefContainer();
            controllerDef = original.prototype['$router_def'];
        } 
        controllerDef.setPath(params.path);

        return original;
    }
}