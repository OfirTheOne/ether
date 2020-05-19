import { Ctor } from "./../../models";
import { MetaType, metaTypeKey } from "../../inner/consts";

export function AppPipeline() {
    return <T extends Ctor>(originalConstructor: T) => {

        const original = originalConstructor;

        original.prototype[metaTypeKey] = MetaType.guard;
        return original;
    }
}