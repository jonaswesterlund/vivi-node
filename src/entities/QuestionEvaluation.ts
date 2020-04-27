import { Property, Entity, ManyToOne } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { AnswerChoice, Question } from '.';

@Entity()
export class QuestionEvaluation extends BaseEntity {
  @Property()
  correctAnswerRationale: string;

  @Property()
  incorrectAnswerRationale: string;

  @ManyToOne()
  correctAnswerChoice: AnswerChoice;

  @ManyToOne()
  question: Question;

  constructor(
    correctAnswerRationale: string,
    incorrectAnswerRationale: string,
    correctAnswerChoice: AnswerChoice
  ) {
    super();
    this.correctAnswerRationale = correctAnswerRationale;
    this.incorrectAnswerRationale = incorrectAnswerRationale;
    this.correctAnswerChoice = correctAnswerChoice;
  }
}
