import { Ctor } from "./../../models";
import { MetaType, metaTypeKey } from "../../inner/consts";

export function Provider() {
    return <T extends Ctor>(originalConstructor: T) => {

        const original = originalConstructor;
        original.prototype[metaTypeKey] = MetaType.provider;

        return original;
    }
}