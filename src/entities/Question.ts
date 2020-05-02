import {
  Property,
  Entity,
  OneToMany,
  Collection,
  ManyToMany,
  OneToOne,
} from 'mikro-orm';
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

  @ManyToMany(
    () => Category,
    category => category.questions
  )
  categories: Collection<Category> = new Collection<Category>(this);

  @OneToOne()
  questionEvaluation?: QuestionEvaluation;

  constructor(content: string) {
    super();
    this.content = content;
  }
}
