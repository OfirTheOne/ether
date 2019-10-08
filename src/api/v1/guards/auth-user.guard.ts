import { Guard } from "../../../../lib/core";
import { IGuard } from "../../../../lib/models";

@Guard() 
export class AuthUserGuard implements IGuard {
    async guard(req, res) {
        debugger;
        try {
            let { authorization } = req.headers;
            authorization = this.parseAuthHeader(authorization);
            if(!authorization) {
                return true;
            }
            return true;
        } catch (error) {
            return true;
        } 
    }

    parseAuthHeader(header: string): string {
        if(header.indexOf('Bearer') != 0) {
            throw 'bad auth header';
        }
        return header.slice('Bearer '.length);
    }
}