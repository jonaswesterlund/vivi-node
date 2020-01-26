import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import Question from './Question';
import AnswerChoice from './AnswerChoice';

@ObjectType()
@Entity()
export default class Answer {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => AnswerChoice, { nullable: true })
  @ManyToOne(() => AnswerChoice, (answerChoice) => answerChoice.answers)
  answerChoice!: AnswerChoice;

  @Field(() => Question, { nullable: true })
  @ManyToOne(() => Question, (question) => question.answers)
  question!: Question;
}
