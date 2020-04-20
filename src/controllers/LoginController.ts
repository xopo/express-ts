import { Request, Response, NextFunction } from 'express';
import { get, controller, post, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {

    @get('/login')
    getLogin(_req: Request, res: Response) {
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" />
                </div>
                <button>Submit</button>
            </form>
        `);
    };

    @bodyValidator('email', 'password')
    @post('/login')
    postLogin(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (email && password && email === 'email' && password === 'pass') {
            // mark the persion as logged in
            req.session = { loggedIn: true };
            res.redirect('/')
            // redirect to the root route
        } else {
            res.status(502).send('invalid user/pass combination');
        }
    };
}

