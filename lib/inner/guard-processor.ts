import { Router } from "express";
import { Ctor } from "../models";
import { guardToRequestHandler } from "../common/convert/guard-to-request-handler";

guardToRequestHandler

export function gourdProcessor(router: Router, gourdClass: Ctor<any>) {

    const gourdHandler = guardToRequestHandler(gourdClass);

    router.all('*', gourdHandler);
    return router;
}
