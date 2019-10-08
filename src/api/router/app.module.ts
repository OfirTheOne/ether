import { PublicModule } from "../v1/modules/public/public.module";
import { AdminModule } from "../v1/modules/admin/admin.module";
import { AuthUserModule } from "../v1/modules/auth-user/user.module";

import { Module } from "../../../lib/core";



@Module({
    modules: [
        AdminModule,
        PublicModule,
        AuthUserModule,
    ]
})
export class AppModule { }
