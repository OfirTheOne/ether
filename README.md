# Ether
## Open Galaxy - Ether

REST API Framework, module based, each module constructed of - 
+ controller(s) 
+ provider(s) 
+ guard(s) 
+ middleware(s)

Those are the building blocks of an Ether API application.

<br>
<br>

## API 


### **ether/core**


#### Controller
`Controller(options: {path: string} = { path: '/'})`

Decorator that marks a class as a Controller. <br>
a controller is a class where each class-method defines a route. <br>
(to define a route you must decorate the class-method with an [Rest-Method decorator](REST-Method)).

```ts
import { Request, Response, NextFunction } from "express";
import { UserHandler } from "./user.handler";
import { Controller, Get } from "@o-galaxy/ether/core";


@Controller({ path: '/user' })
export class UserController {


    constructor(private userHandler: UserHandler) {}
    
    @Get()
    async getUser(req: Request, res: Response, next: NextFunction) {
        const uid = res.locals.uid;
        try {
            let result = await this.userHandler.getUser(uid);

            return res.send(result);
        } catch (error) {
            next(error)
        }
    }
}
```

<br>
<hr>
<br>


#### REST Methods

`<METHOD>(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

<br>

* **Get** <br> 
`Get(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

    Decorator that marks a class-method as a Get method for the provided `route`, where the provided middlewares precede the current handler method.

<br>

* **Post** <br> 
`Post( : string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

    Decorator that marks a class-method as a Post method for the provided `route`, where the provided middlewares precede the current handler method.

<br>

* **Put** <br> 
`Put(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

    Decorator that marks a class-method as a Put method for the provided `route`, where the provided middlewares precede the current handler method.

<br>

* **Delete** <br>
`Delete(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

    defines a Delete method for the provided `route`, where the provided middlewares precede the current handler method.

<br>

* **All** <br>
`All(route: string = '/', middlewares: (Array<RequestHandler> | RequestHandler) = [])`

    Decorator that marks a class-method as a route handler for all api methods, for the provided `route`, where the provided middlewares precede the current handler method.

<br>
<hr>
<br>

#### Guard
`Guard()` 

```ts
interface IGuard {
    guard(req:Request, res:Response): (boolean | Promise<boolean>);
} 
```

Decorator that marks a class as a Guard. <br> 
A guard act as a middleware on a module level and it's basically a class implementing the `IGuard` interface. <br>
The `guard` method implements the logic of the guard middleware, returning `false` value or throwing an error will lead to any error handling middleware. <br>

```ts
import { Guard } from "@o-galaxy/ether/core";
import { IGuard } from "@o-galaxy/ether/models";

@Guard() 
export class AuthUserGuard implements IGuard {
    async guard(req, res): Promise<boolean> {
        try {
            let { authorization } = req.headers;
            authorization = this.parseAuthHeader(authorization);
            if(!authorization) {
                return false;   
            }
            // ...

            return true;
        } catch (error) {
            throw error;
        } 
    }

    parseAuthHeader(header: string): string {
        if(header.indexOf('Bearer') != 0) {
            throw 'bad auth header';
        }
        return header.slice('Bearer '.length);
    }
}
```

<br>
<hr>
<br>

#### Provider

Decorator that marks a class as a Provider. <br>
To inject a provider class in another controller / provider / guard class constructor the class must be decorated with `@Provider()`.


A provider is a class that ideally do one of :
* holds the api call's business logic.
* function as a separation layer between the controller and the db layer. 
* function as a generic (or not) utility service.<br>

```ts
@Provider()
export class UserProvider {

	public async findAndUpdateUser(uid: string, email: string, payload: any ) {
		try {
			const user = await UserModel.findOneAndUpdate(
				// ...
			);
            return user;
			
		} catch (error) {
			throw error;
		}
	}

}
```
<br>
<hr>
<br>

#### Module

`Module(params: Partial<ModuleParameters>)` <br>

```ts
interface ModuleParameters {
    path: string;
    controllers: Array<any>;
    providers: Array<any>;
    modules: Array<any>;
    guards: Array<any>;
}
```

<br>

Modules are a way to group together set of code; controllers, providers, middlewares, that have related functionalities and workflow. <br>
Modules can be plugged into other modules, by doing so, any routes defined in the sub-module, prefixed by the path of the module is plugged into. <br>

```ts
import { Module } from "@o-galaxy/ether/core";
import { LogisterController } from './logister/logister.controller';
import { UserController } from './user/user.controller';
import { AuthUserGuard } from '../../guards/auth-user.guard';


@Module({
    path: '/v1/',
    guards: [
        AuthUserGuard
    ],
    controllers: [
        UserController, 
        LogisterController
    ],
})
export class AuthUserModule { }
```

<br>
<hr>
<br>

#### AppPipeline

Decorator that marks a class as an AppPipeline. <br>

Pipeline (AppPipeline) are a way to wrap together logic that generally used to manipulate application configuration, on plugin modules, such ass `cors`, `body-parser`, etc. <br>
Pipeline can be registered on an Application decorated class, on 2 steps :
- `onCreate` : right after the (express) application object is instantiated, (before any other handlers are registered).
- `afterRoutesInit` : right after all the other handlers (modules, controllers, guards) are registered to the application object.
<br>

```ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';



@AppPipeline()
class BodyParserPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        return app;
    }

}

```
<br>
<hr>
<br>

#### Application

Decorator that marks a class as an Application. <br>

Application class are the root object that the entire server is reduce to. <br>


```ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppModule} from '../api/router/app.module';
import { Application, AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';


@AppPipeline()
class ErrorHandlerPipe implements IAppPipeline {
    pipe(app: express.Application): express.Application {
        
        app.use((err, req, res, next) => {
            res.status(400).send(err);
        });
        return app;
    }
}

@Application({
    pipelines: {
        onCreate: [
            BodyParserPipe,
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


```
<br>
<hr>
<hr>
<br>



### **ether/common**

#### buildApp

`buildApp(application: any): express.Application` <br>

A function used to build an application from an `Application` decorated class. <br> 

```ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from '@o-galaxy/ether/core';
import { AppModule} from '../api/app.module';

...

@Application({
    pipelines: {
        onCreate: [
            BodyParserPipe,
        ]
    },
    modules: [
        AppModule
    ]
})
export class MainApplication { }

export const app = buildApp(MainApplication)
```

<br>
<hr>
<br>

#### serve

`serve(applicationClass: any, port: number, hostname: string, callback?: (...args: any[]) => void): Application`
`serve(applicationClass: any, port: number, callback?: (...args: any[]) => void): Application`

A function used to serve an `Application` decorated class (alias to (express) app.listen). <br> 

```ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from '@o-galaxy/ether/core';
import { serve } from '@o-galaxy/ether/common';
import { AppModule} from '../api/app.module';

...

@Application({
    pipelines: {
        onCreate: [
            BodyParserPipe,
        ]
    },
    modules: [
        AppModule
    ]
})
export class MainApplication { }

const port = 3000;

serve(MainApplication, port,() => {
    console.log(`App listening on the port ${port}`);
});
```

<br>
<hr>
<br>


#### build

`build(module: any): express.Router` <br>

A function used to build a router from a `Module` decorated class. <br> 

```ts
// -- file:  app.module.ts

import { Module } from "@o-galaxy/ether/core";
import { PublicModule } from "../v1/modules/public/public.module";
import { AdminModule } from "../v1/modules/admin/admin.module";
import { AuthUserModule } from "../v1/modules/auth-user/user.module";

@Module({
    modules: [
        AdminModule,
        PublicModule,
        AuthUserModule,
    ]
})
export class AppModule { }
```
```ts
// -- file: index.ts

import { build } from '@o-galaxy/ether/common'
import { AppModule } from './app.module';

export const apiRouter = build(AppModule);
```
```ts
// -- file: server.ts
import { apiRouter } from './api/router'

const app = express();
app.use('/api/', apiRouter);
app.listen(3000);
```

<br>
<hr>
<br>

#### middlewareFactory

`middlewareFactory(handler: RequestHandler, context?: any): () => any`

A function used to create a class-method middleware decorator function, from the provided `handler` function, if a `context` object was provided the `handler` function will be bound to it. <br>

On the following example, using `middlewareFactory`, we're creating a `Log` middleware decorator function, by decorating `postSubject` route with `Log` decorator, the `Log` middleware will precede the `postSubject` route handler, and write the request url and body to the console. <br>

*Note* : <br>
The middleware decorator function must code before the Rest-Method decorator.

<br>

```ts
import { middlewareFactory } from '@o-galaxy/ether/core';

export const Log = middlewareFactory((req, res, next) => {
    console.log('request url: ' + req.originalUrl);
    console.log('request body: ' + req.body);
    next();
})
```

```ts
import { Request, Response, NextFunction } from "express";
import { Controller, Post } from "@o-galaxy/ether/core";
import { SubjectController } from "../../public/subject/subject.controller";

import { Log } from "../../..//middlewares";

@Controller({ path: '/subject' })
export class AdminSubjectController extends SubjectController {

    @Log()
    @Post()
    public async postSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject } = req.body;
            const result = await this.adminSubjectService.postSubject(subject);
            return res.send(result);
        } catch(error) {
            return next(error);
        }
    }

}
```

<br>
<hr>
<hr>
<br>



### TODO

#### Argent
* add feature of extends from controllers from options                          
    + ✔️ Done
* validate the type of object provided on each field in Module decorator.
* add default path to @Module.
    + ✔️ Done
* add default path to @Controller.
    + ✔️ Done
* support inject provider to guard.
    + ✔️ Done
* wrap app with an object composed by application-stages.
    + ✔️ Done
* gathering metadata on each controller and module to plot routing map.

#### Helpful
* warning for path not starting with '/'.
* system error table - describable errors.
* add better errors for injecting non provider classes.
* support passing router options to controller.
* support using guard as decorator on module level.
* defaulting body / params - spec solution or use middlewares (with example).
* abstract / hide the (req, res, next) signature, spec for inject body, params, query, etc..
