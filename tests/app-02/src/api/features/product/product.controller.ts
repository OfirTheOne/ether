import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { ProductHandler } from './product.handler';

@Controller({ path: '/product' })
export class ProductController {


    constructor(
        private productHandler: ProductHandler,
    ) { }

    @Get()
    public async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            

            const result = await this.productHandler.getProduct();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


}