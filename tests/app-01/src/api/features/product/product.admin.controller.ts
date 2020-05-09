import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { ProductAdminHandler } from './product.admin.handler';
import { UploadFile, ReadFile } from '../../common/middlewares/file.middleware';
import { ProductController } from './product.controller'


@Controller({ path: '/product', extends: [ProductController] })
export class ProductAdminController {


    constructor(
        private productAdminHandler: ProductAdminHandler,
    ) { }

    @Post()
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        try {


            const result = await this.productAdminHandler.createProduct(req.body);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


    @ReadFile('product_table_buffer')
    @UploadFile('product_table')
    @Post('/upload/csv')
    public async bulkUploadWithCsv(req: Request, res: Response, next: NextFunction) {
        try {
            const productTableFile = res.locals.product_table_buffer;
            const productTable = productTableFile.toString('utf8');
            return res.send(productTable);
        } catch (error) {
            return next(error)
        }
    }

}