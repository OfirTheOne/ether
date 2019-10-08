
import { GuardFn } from '../models'
export class ModuleGuardContainer {

    gourdFnKey: string = 'guard';

    constructor(private moduleGuardClass: any) {}

    public getGuardFn(): GuardFn {
        const gourdInstance = new (this.moduleGuardClass)();
        return gourdInstance[this.gourdFnKey].bind(gourdInstance);
    }
}