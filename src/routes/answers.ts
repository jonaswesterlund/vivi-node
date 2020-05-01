import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Answer } from '../entities';
import { wrap } from 'mikro-orm';
import { questionEvaluations } from './questionEvaluations';

export const answers = express.Router();

answers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const answers = await DI.answerRepository.findAll();
    res.json(answers);
  } catch (error) {
    next(error);
  }
});

answers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const answer = new Answer();
    wrap(answer).assign(
      {
        question: body.questionId,
        answerChoice: body.answerChoiceId,
      },
      { em: DI.em }
    );
    await DI.answerRepository.persistAndFlush(answer);
    res.json(
      await DI.questionEvaluationRepository.findOne({
        question: body.questionId,
      })
    );
  } catch (error) {
    next(error);
  }
});
