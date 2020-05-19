import { Ctor } from "../../models";
import { metaTypeKey, MetaType, MetaInput } from "../../inner/consts";
import { ApplicationOptions } from "../../models/application-options";


export const defaultApplicationOptionsFactory = (): Partial<ApplicationOptions> => ({ modules: [], controllers: [], guards: [], using: [] , errorHandlers: [], pipelines: {} })


export function Application(options: Partial<ApplicationOptions>) {
    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        original.prototype[metaTypeKey] = MetaType.application;

        const mergedOptions = { ...(defaultApplicationOptionsFactory()), ...options }

        original.prototype[MetaInput.application] = mergedOptions;

        return original;
    }
}