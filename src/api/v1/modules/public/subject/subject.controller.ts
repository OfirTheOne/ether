import { Controller, Get } from "../../../../../../lib/core";
import { Request, Response, NextFunction } from "express";
import { PrintTimestamp } from "../../../middlewares";

@Controller({ path: '/subject' })
export class SubjectController {

    @PrintTimestamp()
    @Get()
    public async getAllSubjects(req: Request, res: Response, next: NextFunction) {
        res.send('getAllSubjects')

    }

}