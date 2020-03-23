
import { LogisterController } from './logister/logister.controller';
import { UserController } from './user/user.controller';
import { Module } from "../../../../../lib/core";
import { AuthUserGuard } from '../../guards/auth-user.guard';


@Module({

    path: '/v1/',
    guards: [
        AuthUserGuard
    ],

    controllers: [
        UserController, 
        LogisterController
    ],
    errorHandlers: [
        (err, req, res, next) => res.send('not found from /v1')
    ]
})
export class AuthUserModule { }




