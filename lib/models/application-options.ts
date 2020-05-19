import { Ctor } from "./type-utils";
import { Usable } from "./usable";
import { PlugablesOptions } from "./plugables-options";
import { RegisteredPipelines } from "./registered-pipeline";

export interface ApplicationOptions extends PlugablesOptions {
    pipelines: Partial<RegisteredPipelines>,
}