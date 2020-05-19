import { Router } from "express";

export function errorHandlerProcessor(router: Router, errorHandler: any): Router {
    return Array.isArray(errorHandler) ? 
        router.use(errorHandler[0], errorHandler[1]) :
        router.use(errorHandler);
} 