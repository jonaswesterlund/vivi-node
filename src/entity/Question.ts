import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@ObjectType()
@Entity()
export default class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column()
  content!: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true })
  answerChoices!: string[];

  @Field({ nullable: true })
  @Column()
  label!: string;
}
