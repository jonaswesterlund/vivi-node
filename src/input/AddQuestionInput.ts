import { InputType, Field } from 'type-graphql';
import Question from '../entity/Question';

@InputType()
export default class AddQuestionInput implements Partial<Question> {
  @Field({ nullable: true })
  content!: string;

  @Field(() => [String], { nullable: true })
  answerChoices!: string[];

  @Field({ nullable: true })
  label!: string;
}
