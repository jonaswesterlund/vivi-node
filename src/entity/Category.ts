import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@ObjectType()
@Entity()
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column()
  name!: string;
}
