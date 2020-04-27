import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';

export const questions = express.Router();

questions.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await DI.questionRepository.findAll(['categories']);
    res.json(questions);
  } catch (error) {
    next(error);
  }
});
