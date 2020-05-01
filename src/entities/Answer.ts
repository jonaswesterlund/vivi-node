import { Entity, ManyToOne } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { AnswerChoice, Question } from '.';

@Entity()
export class Answer extends BaseEntity {
  @ManyToOne()
  answerChoice?: AnswerChoice;

  @ManyToOne()
  question?: Question;

  constructor() {
    super();
  }
}
