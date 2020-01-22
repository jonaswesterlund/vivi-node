import { InputType, Field, ID } from 'type-graphql';

@InputType()
export default class AddAnswerInput {
  @Field(() => ID)
  answerChoiceId!: string;

  @Field(() => ID)
  questionId!: string;
}
