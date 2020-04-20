import express from 'express';

export class AppRouter {
    private static instance: express.Router;

    static getInstance(): express.Router {
        if (!AppRouter.instance) {
            console.log(this, this.instance)
            AppRouter.instance = express.Router();
        }

        return AppRouter.instance;
    }

}