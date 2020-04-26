import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Category } from '../entities';

export const categories = express.Router();

categories.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await DI.categoryRepository.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});
