import { Application } from 'express';
import * as express from 'express';


export interface IAppPipeline {
    pipe (app: express.Application): express.Application;
} 

export type PipeFn = IAppPipeline['pipe']
