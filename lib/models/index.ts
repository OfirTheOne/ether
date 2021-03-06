export type Ctor<T=any> = new(...args:any[]) => T;


export interface ModuleParameters {
    // pre path for the entire module
    path: string;
    // 
    controllers: Array<Ctor<any>>;
    // module dependencies
    providers: Array<Ctor<any>>;
    // plugged modules
    modules: Array<Ctor<any>>;
    //
    guards: Array<Ctor<any>>;
}

export * from './guard';

export interface Type<T> {
    new(...args: any[]): T;
}
