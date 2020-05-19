import { Ctor, ModuleParameters } from "../../models";
import { metaTypeKey, MetaType, MetaInput } from "../../inner/consts";


export function Module(params: Partial<ModuleParameters>) {
    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        original.prototype[metaTypeKey] = MetaType.module;

        original.prototype[MetaInput.module] = params;
        return original;
    }
}