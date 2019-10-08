export type GuardFn = (req, res) => (boolean | Promise<boolean>);

import { Response, Request } from 'express';

export interface IGuard {
    guard(req:Request, res:Response): (boolean | Promise<boolean>);
} 