
import { Module } from "../../../../../lib/core";
import { GraphController } from "./graph/graph.controller";
import { AdminSubjectController } from "./subject/admin-subject.controller";

@Module({
    path: '/v1/admin/',
    
    controllers: [
        GraphController,
        AdminSubjectController
    ]
})
export class AdminModule { }



