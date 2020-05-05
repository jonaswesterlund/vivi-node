import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Question, AnswerChoice, QuestionEvaluation } from '../entities';
import { wrap } from 'mikro-orm';
import { DiagnosticCategory } from 'typescript';

export const questions = express.Router();

questions.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await DI.questionRepository.findAll([
      'categories',
      'answerChoices',
    ]);
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

questions.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const question = new Question(body.content);
    body.answerChoices.forEach((ac: { answer: string }) => {
      const answerChoice = new AnswerChoice(ac.answer);
      question.answerChoices.add(answerChoice);
    });
    const questionEvaluation = new QuestionEvaluation(
      body.correctAnswerRationale,
      body.incorrectAnswerRationale
    );
    questionEvaluation.correctAnswerChoice = question.answerChoices.getItems()[
      body.correctAnswerChoice
    ];
    question.questionEvaluation = questionEvaluation;
    wrap(question).assign(
      {
        categories: body.categoryIds,
      },
      { em: DI.em }
    );
    await DI.questionRepository.persistAndFlush(question);
    res.json(
      await DI.questionRepository.findOne(question.id, [
        'answerChoices',
        'categories',
        'questionEvaluation',
      ])
    );
  } catch (error) {
    next(error);
  }
});
