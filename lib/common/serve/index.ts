import { Application } from "express";
import { buildApp } from "../build-app";


export function serve(application: any, port: number, hostname: string, callback?: (...args: any[]) => void): Application;
export function serve(application: any, port: number, callback: (...args: any[]) => void): Application;
export function serve(application: any, port: number): Application 
export function serve(
    application: any, 
    port: number, 
    hostnameOrCallback?: ( string  | ((...args: any[]) => void)), 
    callback?: ((...args: any[]) => void) 
): Application {

    const app = buildApp(application);

    if(typeof hostnameOrCallback == 'string') {
        app.listen(port, hostnameOrCallback, callback)
    } else {
        app.listen(port, hostnameOrCallback)
    }
    return app;
}