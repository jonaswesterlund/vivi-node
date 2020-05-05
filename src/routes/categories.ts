import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Category } from '../entities';
import { wrap } from 'mikro-orm';

export const categories = express.Router();

categories.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await DI.categoryRepository.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categories.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const category = new Category(body.categoryName);
      await DI.categoryRepository.persistAndFlush(category);
      res.json(await DI.categoryRepository.findOne(category.id));
    } catch (error) {
      next(error);
    }
  }
);
