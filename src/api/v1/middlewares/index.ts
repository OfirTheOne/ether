import { middlewareFactory } from "../../../../lib/common";
import { guardToMiddleware } from "../../../../lib/common/convert/guard-to-middleware";
import { PrintTimestampGuard } from "../guards/print-timestap.guard";

export const Log = middlewareFactory((req, res, next) => {
    console.log('url: ' + req.originalUrl);
    console.log(req.body);
    next();
})


export const PrintTimestamp = guardToMiddleware(PrintTimestampGuard);