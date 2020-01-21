import { InputType, Field, ID } from 'type-graphql';
import AnswerChoice from '../entity/AnswerChoice';

@InputType()
export default class AddAnswerChoice implements Partial<AnswerChoice> {
  @Field({ nullable: true })
  answer!: string;

  @Field(() => ID, { nullable: true })
  questionId!: string;
}
