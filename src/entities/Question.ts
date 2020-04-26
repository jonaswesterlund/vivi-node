import { Property, Entity, OneToMany, Collection, ManyToMany } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { Answer, AnswerChoice, Category, QuestionEvaluation } from '.';

@Entity()
export class Question extends BaseEntity {
  @Property()
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

  @OneToMany(
    () => QuestionEvaluation,
    questionEvaluation => questionEvaluation.question
  )
  questionEvaluations = new Collection<QuestionEvaluation>(this);

  constructor(
    content: string,
    answerChoices: Collection<AnswerChoice>,
    categories: Collection<Category>
  ) {
    super();
    this.content = content;
    this.answerChoices = answerChoices;
    this.categories = categories;
  }
}
