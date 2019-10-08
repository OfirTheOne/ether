import { Controller, Post, Get } from "../../../../../../lib/core";
import { NextFunction, Request, Response } from "express";

@Controller({ path: '/graph' })
export class GraphController {

    
    @Get() 
    async getNode(req: Request, res: Response, next: NextFunction) {
        try {
            return res.send({ getNode: true });
        } catch (error) {
            return next(error);
        }
    }

    @Post() 
    async postNode(req: Request, res: Response, next: NextFunction) {
        try {
            return res.send({ postNode: true });
        } catch (error) {
            return next(error);
        }
    }

}

