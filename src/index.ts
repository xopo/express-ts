import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';

import './controllers/LoginController';
import './controllers/RouteController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['strongencryptionkey'] }));
app.use(AppRouter.getInstance());
// console.log(JSON.stringify(router.stack));
// console.log(3);
app.listen(3001, () => console.log('listen on port 3001'));