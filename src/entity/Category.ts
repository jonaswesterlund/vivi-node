import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany,
} from 'typeorm';
import Question from './Question';

@ObjectType()
@Entity()
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column()
  name!: string;

  @Field(() => [Question], { nullable: true })
  questions!: Question[];
}
