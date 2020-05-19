import { NextFunction, Request, Response } from 'express';

export async function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	const status = error.status || 500;
	return res.status(status).send(error);
}
