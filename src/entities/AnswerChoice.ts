import { Property, Entity, ManyToOne, OneToMany, Collection } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { Answer, Question } from '.';

@Entity()
export class AnswerChoice extends BaseEntity {
  @Property()
  answer: string;

  @ManyToOne()
  question: Question;

  @OneToMany(
    () => Answer,
    answer => answer.answerChoice
  )
  answers = new Collection<Answer>(this);

  constructor(answer: string, question: Question) {
    super();
    this.answer = answer;
    this.question = question;
  }
}
