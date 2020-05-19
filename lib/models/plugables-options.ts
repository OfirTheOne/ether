import { Usable } from "./usable";
import { Ctor } from "./type-utils";

export interface PlugablesOptions {
    controllers: Array<Ctor<any>>;
    // plugged modules
    modules: Array<Ctor<any>>;
    //
    guards: Array<Ctor<any>>;

    using: Array<Usable>
    errorHandlers: Array<(Function)>//|{path: string, handler: Function})>);
}