

import { Module } from '@o-galaxy/ether/core';
import { CategoryAdminController } from './features/category/category.admin.controller';
import { ProductAdminController } from './features/product/product.admin.controller';

;

@Module({

    path: '/api',
    controllers: [
        CategoryAdminController,
        ProductAdminController
    ]
}) 
export class AppModule { }