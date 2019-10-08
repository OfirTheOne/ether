import { middlewareFactory } from "../../../../lib/common";

export const Log = middlewareFactory((req, res, next) => {
    console.log('url: ' + req.originalUrl);
    console.log(req.body);
    next();
})