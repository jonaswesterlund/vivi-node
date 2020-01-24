import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne,
} from 'typeorm';
import Category from './Category';
import AnswerChoice from './AnswerChoice';
import Answer from './Answer';
import QuestionEvaluation from './QuestionEvaluation';

@ObjectType()
@Entity()
export default class Question {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column()
  content!: string;

  @Field(() => [AnswerChoice], { nullable: true })
  @OneToMany(() => AnswerChoice, (answerChoice) => answerChoice.question, { cascade: true })
  answerChoices!: AnswerChoice[];

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];

  @Field(() => QuestionEvaluation, { nullable: true })
  @OneToOne(() => QuestionEvaluation)
  @JoinTable()
  questionEvaluation!: QuestionEvaluation;
}
