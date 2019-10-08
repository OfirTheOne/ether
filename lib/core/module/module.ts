import { Ctor, ModuleParameters } from "../../models";


export function Module(params: Partial<ModuleParameters>) {
    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        original.prototype['$meta.type'] = '@Module';

        original.prototype['$module_params'] = params;
        return original;
    }
}