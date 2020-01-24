import { InputType, Field, ID } from 'type-graphql';
import QuestionEvaluation from '../entity/QuestionEvaluation';

@InputType()
export default class AddQuestionEvaluationInput implements Partial<QuestionEvaluation> {
  @Field({ nullable: true })
  correctAnswerRationale!: string;

  @Field({ nullable: true })
  incorrectAnswerRationale!: string;

  @Field({ nullable: true })
  correctAnswerChoiceId!: string;

  @Field({ nullable: true })
  questionId!: string;
}
