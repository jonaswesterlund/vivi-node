import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, PrimaryColumn, JoinTable,
} from 'typeorm';
import Question from './Question';

@ObjectType()
@Entity()
export default class Category {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column()
  name!: string;

  @Field(() => [Question], { nullable: true })
  @ManyToMany(() => Question)
  questions!: Question[];
}
