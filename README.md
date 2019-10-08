# Ether

REST API Framework, module based, each module constructed of - 
+ controller(s) 
+ provider(s) 
+ gourd(s) 
+ middleware(s)

Those are the building blocks of an Ether API application.

<br>
<br>

### Controller
`Controller(options: {path: string} = { path: '/'})`

Controller represent a class where each class-method defines a route. <br>
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
<br>


### API Methods

`<METHOD>(route: string = '/', validators: (Array<RequestHandler> | RequestHandler) = [])`

<br>

### Get 
`Get()`

defines a Get method.

<br>

### Post 
`Post()`

defines a Post method.

<br>

### Put 
`Put()`

defines a Put method.

<br>

### Delete 
`Delete()`

defines a Delete method.

<br>

### All 
`All()`

defines a route under all api methods.

<br>
<br>

### Guard
`Guard()`

Gourd represent a middleware on a module level . <br>
It's basically a class implementing the `IGuard` interface.

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
<br>

### Provider


<br>
<br>

### Module