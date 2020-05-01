import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { AnswerChoice } from '../entities';

export const answerChoices = express.Router();

answerChoices.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answerChoices: AnswerChoice[] = await DI.answerChoiceRepository.findAll();
      res.json(answerChoices);
    } catch (error) {
      next(error);
    }
  }
);
