import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, OneToMany,
} from 'typeorm';
import Question from './Question';
import Answer from './Answer';

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

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.answerChoice)
  answers!: Answer[];
}
