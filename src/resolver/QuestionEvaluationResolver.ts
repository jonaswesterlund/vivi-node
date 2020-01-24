import {
  Resolver, Query, Arg, ID, Mutation, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import QuestionRepository from '../repository/QuestionRepository';
import Question from '../entity/Question';
import AddQuestionInput from '../input/AddQuestionInput';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';
import CategoryRepository from '../repository/CategoryRepository';
import AddAnswerChoiceInput from '../input/AddAnswerChoiceInput';
import QuestionEvaluation from '../entity/QuestionEvaluation';
import QuestionEvaluationRepository from '../repository/QuestionEvaluationRepository';
import AddAnswerInput from '../input/AddAnswerInput';
import AnswerRepository from '../repository/AnswerRepository';

@Resolver(() => QuestionEvaluation)
export default class QuestionEvaluationResolver {
  answerRepository: AnswerRepository;

  questionEvaluationRepository: QuestionEvaluationRepository;

  questionRepository: QuestionRepository;

  constructor() {
    this.answerRepository = getCustomRepository(AnswerRepository);
    this.questionEvaluationRepository = getCustomRepository(QuestionEvaluationRepository);
    this.questionRepository = getCustomRepository(QuestionRepository);
  }

  @Mutation(() => QuestionEvaluation)
  async addAnswer(@Arg('addAnswerInput', () => AddAnswerInput) addAnswerInput: AddAnswerInput) {
    const question = await this.questionRepository.findOne(addAnswerInput.questionId, { relations: ['answerChoices, questionEvaluation'] });
    if (!question) {
      throw new Error('Question not found');
    }
    const answer = this.answerRepository.create({
      question,
      answerChoice: question.answerChoices.find((choice) => choice.id.toString() === addAnswerInput.answerChoiceId),
    });
    const [questionEvaluation, savedAnswer] = await Promise.all([
      this.questionEvaluationRepository.findOne(question.questionEvaluation.id),
      this.answerRepository.save(answer),
    ]);
    return questionEvaluation;
  }

  @FieldResolver()
  async correctAnswerChoice(@Root() questionEvaluation: QuestionEvaluation) {
    const loadedQuestionEvaluation = await this.questionEvaluationRepository.findOne(
      questionEvaluation.id,
      { relations: ['correctAnswerChoice'] },
    ) as QuestionEvaluation;
    return loadedQuestionEvaluation.correctAnswerChoice;
  }

  @FieldResolver()
  async question(@Root() questionEvaluation: QuestionEvaluation) {
    const loadedQuestionEvaluation = await this.questionEvaluationRepository.findOne(
      questionEvaluation.id,
      { relations: ['question'] },
    ) as QuestionEvaluation;
    return loadedQuestionEvaluation.question;
  }
}
