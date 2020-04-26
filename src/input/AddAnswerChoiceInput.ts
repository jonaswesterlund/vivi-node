import { InputType, Field, ID } from 'type-graphql';
import AnswerChoice from '../entity/AnswerChoice';

@InputType()
export default class AddAnswerChoiceInput implements Partial<AnswerChoice> {
  @Field({ nullable: true })
  answer!: string;

  @Field({ nullable: true })
  isCorrect!: boolean;
}
