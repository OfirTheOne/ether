

import { Module } from "../../../../../lib/core";
import { SubjectController } from "./subject/subject.controller";


@Module({
    path: '/v1/public/',
    
    controllers: [
        SubjectController,
    ]
})
export class PublicModule {}




