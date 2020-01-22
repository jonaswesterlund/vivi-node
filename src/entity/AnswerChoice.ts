import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn,
} from 'typeorm';
import Question from './Question';

@ObjectType()
@Entity()
export default class AnswerChoice {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column()
  answer!: string;

  @Field(() => Question, { nullable: true })
  @ManyToOne(() => Question, (question) => question.answerChoices)
  question!: Question;
}
