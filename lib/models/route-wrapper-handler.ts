import { RequestHandler, NextFunction, Request, Response } from "express";


export interface RouteWrapperHandler {
    (requestHandler: RequestHandler, req: Request, res: Response, next: NextFunction) : any
}