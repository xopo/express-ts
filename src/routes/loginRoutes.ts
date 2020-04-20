import { Request, Response, NextFunction } from 'express';
import { AppRouter } from '../AppRouter';

interface RequestWithBody extends Request {
    body:  { [key: string]: string | undefined }
}

const router = AppRouter.getInstance();



