
import { Request, Response, NextFunction } from "express";
import { Controller, Get, Put, Post } from "../../../../../../lib/core";
import { LogisterValidator } from "./logister.validator";
import { LogisterHandler } from "./logister.handler";

@Controller({ path: '/logister' })
export class LogisterController {

    

	constructor(private logisterHandler: LogisterHandler) { }

	@Post('/', LogisterValidator.logisterBodyValidator)
	async logister(req: Request, res: Response, next: NextFunction) {
		
		try {
			const user = await this.logisterHandler.logister();
			return res.send(user);
		} catch (error) {
			next(error)
		}
	}
}

