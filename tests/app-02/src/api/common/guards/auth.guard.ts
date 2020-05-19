import { Guard } from "@o-galaxy/ether/core";
import { IGuard } from "@o-galaxy/ether/models";
import * as express from 'express'
import { AuthService } from "../services/auth.service";


@Guard()
export class AuthGuard implements IGuard {

    constructor(private auth: AuthService) {}
    guard(req: express.Request, res: express.Response): boolean | Promise<boolean> {
        
        if(this.auth.authenticate(req.headers['authorization'])) {
            return true;
        } else {
            throw new Error('unauthorized');
        }
    }


}