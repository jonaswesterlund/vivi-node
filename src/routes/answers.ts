import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Answer } from '../entities';
import { wrap } from '@mikro-orm/core';

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
    const { questionId, answerChoiceId, firstAnswer } = req.body;
    if (firstAnswer) {
      const answer = new Answer();
      wrap(answer).assign(
        {
          question: questionId,
          answerChoice: answerChoiceId,
        },
        { em: DI.em }
      );
      await DI.answerRepository.persistAndFlush(answer);
    }
    res.json(
      await DI.questionEvaluationRepository.findOne(
        {
          question: questionId,
        },
        ['correctAnswerChoice']
      )
    );
  } catch (error) {
    next(error);
  }
});
