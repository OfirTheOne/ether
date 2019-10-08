import { Controller, Get } from "../../../../../../lib/core";
import { Request, Response, NextFunction } from "express";

@Controller({ path: '/subject' })
export class SubjectController {

    @Get()
    public async getAllSubjects(req: Request, res: Response, next: NextFunction) {
        res.send('getAllSubjects')

    }

}