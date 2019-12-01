
import { RequestHandler, Request, Response, NextFunction } from 'express'

export function wrapperApplier(
    requestHandler: RequestHandler, 
    wrapperHandler: (requestHandler: RequestHandler, req: Request, res: Response, next: NextFunction) => void
    ): RequestHandler {

    return function(req, res, next) {
        try {
            
            wrapperHandler(requestHandler, req, res, next);
        } catch (error) {
            return next(error);
        }
    }

}


export function wrapperFactory() {
    
}