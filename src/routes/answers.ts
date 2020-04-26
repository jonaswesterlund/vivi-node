import express, { NextFunction, Response, Request } from 'express';

export const answers = express.Router();

answers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json([]);
  } catch (error) {
    next(error);
  }
});
