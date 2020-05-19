// == 
import * as express from 'express';


import { apiRouter } from '../api';
import { errorMiddleware } from './error-handler';


import { bodyParserStage } from './app-stages/body-parser.app-stage';


export class App {
    public app: express.Application;
    public port: number;

    constructor(port: any) {

        this.app = express();
        this.port = port;
        this.initAppUsage();

    }

    private initAppUsage() {

        bodyParserStage(this.app)

        // sessionStoreStage(this.app);
        this.initializeRoutes();
        this.app.use(errorMiddleware);
        this.initFirebase();
    }

    private initFirebase() {

        // if (process.env.LOCAL_FIREBASE_UID) {
        //     FirebaseController.getIdToken(process.env.LOCAL_FIREBASE_UID);
        // }
    }


    private initializeRoutes() {
        this.app.use('/api/', apiRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


    