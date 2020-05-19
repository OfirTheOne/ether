import { Application } from "express";
import { applicationProcessor } from "../../inner/application-processor";

export function buildApp(application: any): Application {

    return applicationProcessor(application);

}