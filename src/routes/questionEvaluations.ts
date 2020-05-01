import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { QuestionEvaluation } from '../entities';

export const questionEvaluations = express.Router();

questionEvaluations.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionEvaluations: QuestionEvaluation[] = await DI.questionEvaluationRepository.findAll();
      res.json(questionEvaluations);
    } catch (error) {
      next(error);
    }
  }
);
