import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
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

  @ManyToOne(() => AnswerChoice)
  answerChoice!: AnswerChoice;

  @ManyToOne(() => Question)
  question!: Question;
}
