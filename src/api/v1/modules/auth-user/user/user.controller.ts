
import { Request, Response, NextFunction } from "express";
import { UserHandler } from "./user.handler";
import { Controller, Get, Put, Post } from "../../../../../../lib/core";
// import { TryCatch } from "../../../../../../lib/common/utility";


@Controller({ path: '/user' })
export class UserController {


	constructor(private userHandler: UserHandler) {}
	// @TryCatch((e, next) => next(e))
	@Get()
    async getUser(req: Request, res: Response, next: NextFunction) {

		try {
			let result = await this.userHandler.getUser();
			throw 'error from controller';
			return res.send(result);
		} catch (error) {
			next(error)
		}
	}

    @Put()
	async editUser(req: Request, res: Response, next: NextFunction) {

		try {
			const result = await this.userHandler.editUser();
			return res.send(result);
		} catch (error) {
			next(error)
		}
	}

    @Put('/logout')
	async logout(req: Request, res: Response, next: NextFunction) {
		res.send({ status: "success" })
	}

}

