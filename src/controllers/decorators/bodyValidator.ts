import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
    // return function(req: Request, res: Response, next: NextFunction) {
    //     console.log(req.body, keys);
    //     next()
    // }
    return function(target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    }
}