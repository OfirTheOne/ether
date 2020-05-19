import { Ctor } from "./type-utils";
import { PlugablesOptions } from "./plugables-options";

export interface ModuleParameters extends PlugablesOptions {
    // pre path for the entire module
    path: string;
    // module dependencies
    providers: Array<Ctor<any>>;
    // 

}