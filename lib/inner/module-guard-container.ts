
import { GuardFn } from '../models';
import { Injector } from './di/injector';

const injector = Injector.create();

export class ModuleGuardContainer {

    gourdFnKey: string = 'guard';

    constructor(private moduleGuardClass: any) {}

    public getGuardFn(): GuardFn {
        const gourdInstance = injector.resolve(this.moduleGuardClass);
        return gourdInstance[this.gourdFnKey].bind(gourdInstance);
    }
}