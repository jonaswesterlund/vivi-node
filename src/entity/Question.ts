import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';
import Category from './Category';
import AnswerChoice from './AnswerChoice';

@ObjectType()
@Entity()
export default class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column()
  content!: string;

  @Field(() => [AnswerChoice], { nullable: true })
  @OneToMany(() => AnswerChoice, (answerChoice) => answerChoice.question, { cascade: true })
  answerChoices!: AnswerChoice[];

  @Column({ type: 'text', array: true, nullable: true })
  categoryIds!: string[];

  @Field(() => [Category], { nullable: true })
  categories!: Category[];
}
