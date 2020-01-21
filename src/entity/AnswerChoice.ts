import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Question from './Question';

@ObjectType()
@Entity()
export default class AnswerChoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column()
  answer!: string;

  @Column()
  questionId!: string;

  @ManyToOne(() => Question)
  question!: Question;
}
