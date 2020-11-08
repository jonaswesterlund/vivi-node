import { Property, Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { AnswerChoice, Question } from '.';

@Entity()
export class QuestionEvaluation extends BaseEntity {
  @Property()
  correctAnswerRationale: string;

  @Property()
  incorrectAnswerRationale: string;

  @ManyToOne(() => AnswerChoice)
  correctAnswerChoice?: AnswerChoice;

  @OneToOne(
    () => Question,
    question => question.questionEvaluation,
    { nullable: true }
  )
  question?: Question;

  constructor(
    correctAnswerRationale: string,
    incorrectAnswerRationale: string
  ) {
    super();
    this.correctAnswerRationale = correctAnswerRationale;
    this.incorrectAnswerRationale = incorrectAnswerRationale;
  }
}
