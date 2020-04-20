import { controller, get, use } from './decorators';
import { Request, Response, NextFunction } from 'express';

interface RequestHandler extends Request {
    [key: string]: any;
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session?.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not permited');
}

@controller('')
class RouteController {

    @get('/')
    getRoot(req: RequestHandler, res: Response) {
        if (req?.session?.loggedIn) {
            res.send(`
            <div>
                You are logged in
                <a href="/logout">Logout</a>
            </div>
            `)
        } else {
            res.status(404).send(`
                <div>
                    You are not logged in
                    <a href="/auth/login">Login</div>
                </div>
            `)
        }
    };

    @get('/logout')
    getLogout(req:Request, res: Response) {
        req.session = { loggedIn: false };
        res.redirect('/');
    };

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res:Response) {
        res.send('Welcome to protected route')
    };
}