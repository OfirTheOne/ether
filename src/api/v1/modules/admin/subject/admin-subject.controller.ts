import { Controller, Post } from "../../../../../../lib/core";
import { Request, Response, NextFunction } from "express";
import { SubjectController } from "../../public/subject/subject.controller";
import { Log } from "../../..//middlewares";

@Controller({ path: '/subject' })
export class AdminSubjectController extends SubjectController {

    @Log()
    @Post()
    public async postSubject(req: Request, res: Response, next: NextFunction) {
        res.send('postSubject')
    }

}

