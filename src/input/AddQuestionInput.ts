import { InputType, Field, ID } from 'type-graphql';
import Question from '../entity/Question';

@InputType()
export default class AddQuestionInput implements Partial<Question> {
  @Field({ nullable: true })
  content!: string;

  @Field(() => [ID], { nullable: true })
  categoryIds!: string[];
}
