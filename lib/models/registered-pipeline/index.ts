import { Ctor } from "../type-utils";

export type RegisteredPipelines = {

    [key in RegisteredPipelineStep] : Array<Ctor>

}


export type RegisteredPipelineStep = 'onCreate' | 'afterRoutesInit';
