import { InputType, Field, ID } from 'type-graphql';
import Question from '../entity/Question';
import AddAnswerChoiceInput from './AddAnswerChoiceInput';

@InputType()
export default class AddQuestionInput implements Partial<Question> {
  @Field({ nullable: true })
  content!: string;

  @Field(() => [ID], { nullable: true })
  categoryIds!: string[];

  @Field(() => [AddAnswerChoiceInput], { nullable: true })
  answerChoiceInputs!: AddAnswerChoiceInput[];

  @Field({ nullable: true })
  correctAnswerRationale!: string;

  @Field({ nullable: true })
  incorrectAnswerRationale!: string;
}
