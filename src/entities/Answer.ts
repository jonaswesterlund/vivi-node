import { Entity, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { AnswerChoice, Question } from '.';

@Entity()
export class Answer extends BaseEntity {
  @ManyToOne(() => AnswerChoice)
  answerChoice?: AnswerChoice;

  @ManyToOne(() => Question)
  question?: Question;

  constructor() {
    super();
  }
}
