import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import Category from './Category';

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
  @Column({ type: 'text', array: true })
  answerChoices!: string[];

  @Column({ type: 'text', array: true, nullable: true })
  categoryIds!: string[];

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];
}
