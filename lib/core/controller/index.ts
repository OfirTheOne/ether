import { ControllerDefContainer } from "../../inner/controller-def-container";
import { metaTypeKey, MetaType } from '../../inner/meta-types'
import { Ctor, ControllerOptions } from "../../models";



export const defaultControllerOptionsFactory = (): ControllerOptions => ({ path: '/', extends: [] })


export function Controller(options: Partial<ControllerOptions> = defaultControllerOptionsFactory()) {
    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        original.prototype[metaTypeKey] = MetaType.controller;

        const mergedOptions = { ...(defaultControllerOptionsFactory()), ...options }
        let controllerDef: ControllerDefContainer = ControllerDefContainer.extractControllerDefContainer(original);

        if(controllerDef == undefined) {
            ControllerDefContainer.insertControllerDefContainer(original, new ControllerDefContainer())
            controllerDef = ControllerDefContainer.extractControllerDefContainer(original);
        } 
        controllerDef.setPath(mergedOptions.path);
        controllerDef.setExtendsControllers(mergedOptions.extends)

        return original;
    }
}