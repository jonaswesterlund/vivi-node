import express, { NextFunction, Response, Request } from 'express';
import { DI } from '..';
import { Sequence } from '../entities';
import { wrap } from '@mikro-orm/core';

export const sequences = express.Router();

sequences.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sequences = await DI.sequenceRepository.findAll(['questions']);
    res.json(sequences);
  } catch (error) {
    next(error);
  }
});

sequences.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const sequence = new Sequence(body.name);
    wrap(sequence).assign(
      {
        questions: body.questionIds,
      },
      { em: DI.em }
    );
    await DI.sequenceRepository.persistAndFlush(sequence);
    res.json(await DI.sequenceRepository.findOne(sequence.id, ['questions']));
  } catch (error) {
    next(error);
  }
});
