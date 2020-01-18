import { InputType, Field, ID } from 'type-graphql';
import Question from '../entity/Question';
import Category from '../entity/Category';

@InputType()
export default class AddQuestionInput implements Partial<Question> {
  @Field({ nullable: true })
  content!: string;

  @Field(() => [String], { nullable: true })
  answerChoices!: string[];

  @Field(() => [ID], { nullable: true })
  categoryIds!: string[];
}
