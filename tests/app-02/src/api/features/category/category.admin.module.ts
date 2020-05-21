

import { Module } from '@o-galaxy/ether/core';
import { CategoryAdminController } from './category.admin.controller';

;

@Module({

    path: '/',

    controllers: [
        CategoryAdminController,
    ]
}) 
export class CategoryAdminModule { }