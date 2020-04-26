import express, { NextFunction, Response, Request } from 'express';

const categories = express.Router();

categories.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json([]);
  } catch (error) {
    next(error);
  }
});

export default categories;
