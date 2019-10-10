# Ether

REST API Framework, module based, each module constructed of - 
+ controller(s) 
+ provider(s) 
+ gourd(s) 
+ middleware(s)

Those are the building blocks of an Ether API application.

<br>
<br>
<br>

### Controller
`Controller(options: {path: string} = { path: '/'})`

Decorator that marks a class as Controller. 
a controller is a class where each class-method defines a route. <br>
(to define a route you must decorate the method with an ApiMethod decorator).

```ts
import { Request, Response, NextFunction } from "express";
import { UserHandler } from "./user.handler";
import { Controller, Get } from "ether/core";


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


### REST Methods

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

### Guard
`Guard()` 

```ts
interface IGuard {
    guard(req:Request, res:Response): (boolean | Promise<boolean>);
} 
```
<br>

Decorator that marks a class as Gourd.  a gourd is a middleware on a module level. <br>
It's basically a class implementing the `IGuard` interface. <br>
The `guard` method implements the logic of the guard middleware, returning `false` value of throwing an error will lead to an error handler. <br>

```ts
import { Guard } from "ether/core";
import { IGuard } from "ether/models";

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

### Provider


<br>
<hr>
<br>

### Module

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
import { Module } from "ether/core";
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

