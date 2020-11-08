import {
  Property,
  Entity,
  OneToMany,
  Collection,
  ManyToMany,
  OneToOne,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Answer, AnswerChoice, Category, QuestionEvaluation } from '.';

@Entity()
export class Question extends BaseEntity {
  @Property({ columnType: 'varchar' })
  content: string;

  @OneToMany(
    () => AnswerChoice,
    answerChoice => answerChoice.question
  )
  answerChoices = new Collection<AnswerChoice>(this);

  @OneToMany(
    () => Answer,
    answer => answer.question
  )
  answers = new Collection<Answer>(this);

  @ManyToMany(() => Category)
  categories: Collection<Category> = new Collection<Category>(this);

  @OneToOne(() => QuestionEvaluation)
  questionEvaluation?: QuestionEvaluation;

  constructor(content: string) {
    super();
    this.content = content;
  }
}
