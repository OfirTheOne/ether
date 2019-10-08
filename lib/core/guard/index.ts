import { Ctor } from "./../../models";

export function Guard() {
    return <T extends Ctor>(originalConstructor: T) => {

        const original = originalConstructor;

        original.prototype['$meta.type'] = '@Guard';
        return original;
    }
}