import * as env from 'dotenv';
env.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';
import * as config from 'config';

import "reflect-metadata";

import {apiRouter} from '../api/router';
import { Application } from 'lib/core/application';
import { AppPipeline } from 'lib/core/app-pipeline';
import { IAppPipeline } from 'lib/models/app-pipeline';
// import {errorMiddleware} from '../middleware/error';

// import '../db/mongo/init'; // apply connection for mongo
// import '../db/elastic/init'; // apply connection for elasticsearch



//in order to use firebase a private key should be added to to the environment variables




export class App {
    public app: express.Application;
    public port: number;

    constructor(port: any) {

        this.app = express();
        this.port = port;

        this.initAppUsage();

    }

    private initAppUsage() {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }



    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors())
        this.app.use('/api/', express.static(__dirname + '/../../webApidoc'));

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });


    }

    private initializeErrorHandling() {
        this.app.use((err, req, res, next) => {
            res.status(400).send(err);
        });
    }


    private initializeRoutes() {
        this.app.use('/api/', apiRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
            console.log('on NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

        });
    }
}

