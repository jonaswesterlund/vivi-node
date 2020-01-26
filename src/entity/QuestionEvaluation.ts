import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
} from 'typeorm';
import Question from './Question';
import AnswerChoice from './AnswerChoice';

@ObjectType()
@Entity()
export default class QuestionEvaluation {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column()
  correctAnswerRationale!: string;

  @Field({ nullable: true })
  @Column()
  incorrectAnswerRationale!: string;

  @Field(() => AnswerChoice, { nullable: true })
  @OneToOne(() => AnswerChoice)
  @JoinColumn()
  correctAnswerChoice!: AnswerChoice;

  @Field(() => Question, { nullable: true })
  question!: Question;
}
