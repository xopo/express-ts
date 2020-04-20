import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';
// import express from 'express';

// export const router = express.Router();
// console.log('setup decorator router');

const invalid = (res: Response) => {
    res.status(422).send('Invalid request')
    return;
}

function bodyValidators(keys: string): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            invalid(res);
        }

        for (let key of keys) {
            if (!req.body[key]) {
                invalid(res);
            }
        }

        next();
    }
}

export function controller(routePrefix: string) {
    return function(target: Function) {
        const router = AppRouter.getInstance();

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];

            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const requiredProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requiredProps);

            if (path && method) {
                console.log({routePrefix, path, th: `${routePrefix}${path}`})
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    }
}