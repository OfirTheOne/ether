import * as env from 'dotenv';
env.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import "reflect-metadata";

import { AppModule} from '../api/app.module';
import { Application, AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models/app-pipeline';




@AppPipeline()
class BodyParserPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        return app;
    }

}

@AppPipeline()
class CorsPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use(cors())

        app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        return app;
    }

}

@AppPipeline()
class ApiDocsPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use('/api/', express.static(__dirname + '/../../webApidoc'));

        return app;
    }

}

@AppPipeline()
class ErrorHandlerPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(400).send({message: err.message})
        });
        return app;
    }
}


@Application({
    pipelines: {
        onCreate: [
            BodyParserPipe,
            ApiDocsPipe,
            CorsPipe
        ],

        afterRoutesInit: [
            ErrorHandlerPipe
        ]
    },
    modules: [
        AppModule
    ]
})
export class MainApplication { }

