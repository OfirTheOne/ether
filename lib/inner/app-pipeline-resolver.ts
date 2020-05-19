
import { PipeFn } from '../models/app-pipeline';
import { Injector } from "./di/injector";

const injector = Injector.create();
export class AppPipelineResolver {

    pipeFnKey: string = 'pipe';

    constructor(private appPipelineClass: any) {}

    public getPipeFn(): PipeFn {
        const pipelineInstance = injector.resolve(this.appPipelineClass)
        return pipelineInstance[this.pipeFnKey].bind(pipelineInstance);
    }
}