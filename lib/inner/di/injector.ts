import 'reflect-metadata';

import { Type } from './../../models'

export class Injector {


    static create() {
        return new Injector();
    }

    private constructor() {}

    /** resolve the target instance using the manually provided dependencies tokens.
     *  NOTE: instantiate the dependency with no arguments
     * */
    public resolve<T>(target: Type<T>, tokens: Array<string>): T; 
    /** resolve the target instance recursively using reflected metadata dependencies tokens.
     * */
    public resolve<T>(target: Type<T>): T;
    public resolve<T>(target: Type<any>, tokens?: Array<any>): T {
        let metaTokens: Array<any> ;

        // tokens are required dependencies, while injections are resolved tokens from the Injector
        if(!target) { 
            return; 
        }

        if(arguments.length == 2 && tokens != undefined && tokens != null && Array.isArray(tokens)) {
            metaTokens = tokens;
        } else {
            metaTokens = Reflect.getMetadata('design:paramtypes', target) || [];
        }

        const injections = metaTokens.map(token => this.resolve<any>(token));

        try {
            return new target(...injections);
        } catch (error) {
            throw error;
        }
    }

}
