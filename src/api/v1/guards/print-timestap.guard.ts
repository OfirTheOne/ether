import { Guard } from "../../../../lib/core";
import { IGuard } from "../../../../lib/models";

@Guard() 
export class PrintTimestampGuard implements IGuard {
    async guard(req, res) {
        debugger;
        try {
            console.log(Date.now())
            return true;
        } catch (error) {
            return true;
        } 
    }
}