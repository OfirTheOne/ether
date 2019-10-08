import { Ctor } from "./../../models";

export function Provider() {
    return <T extends Ctor>(originalConstructor: T) => {

        const original = originalConstructor;
        original.prototype['$meta.type'] = '@Provider';

        return original;
    }
}