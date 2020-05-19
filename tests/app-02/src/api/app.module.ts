

import { Module } from '@o-galaxy/ether/core';
import { AuthGuard } from './common/guards/auth.guard';
import { CategoryAdminController } from './features/category/category.admin.controller';
import { ProductAdminController } from './features/product/product.admin.controller';

;

@Module({

    path: '/api',
    guards: [
        AuthGuard
    ],
    controllers: [
        CategoryAdminController,
        ProductAdminController
    ]
}) 
export class AppModule { }