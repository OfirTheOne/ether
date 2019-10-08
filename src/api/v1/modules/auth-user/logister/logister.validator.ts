
export class LogisterValidator {

    static logisterBodyValidator = (req, res, next) => {
        console.log('logisterBodyValidator');
        next();
    }
}