import { Ctor } from "./type-utils";

export interface ControllerOptions {
    path: string, 
    extends: Array<Ctor<any>>
}
