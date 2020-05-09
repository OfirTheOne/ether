import { Ctor } from "./type-utils";
import { Application, Router, RequestHandler } from "express";

export interface ModuleParameters {
    // pre path for the entire module
    path: string;
    // 
    controllers: Array<Ctor<any>>;
    // module dependencies
    providers: Array<Ctor<any>>;
    // plugged modules
    modules: Array<Ctor<any>>;
    //
    guards: Array<Ctor<any>>;

    using: Array<Application|RequestHandler|Router>
    errorHandlers: Array<(Function)>//|{path: string, handler: Function})>);
}