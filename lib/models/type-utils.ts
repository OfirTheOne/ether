export type Ctor<T=any> = new(...args:any[]) => T;
export interface Type<T> {
    new(...args: any[]): T;
}
