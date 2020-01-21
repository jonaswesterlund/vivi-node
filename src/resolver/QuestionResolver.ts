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

@Resolver(() => Question)
export default class QuestionResolver {
  questionRepository: QuestionRepository;

  categoryRepository: CategoryRepository;

  answerChoiceRepository: AnswerChoiceRepository;

  constructor() {
    this.questionRepository = getCustomRepository(QuestionRepository);
    this.categoryRepository = getCustomRepository(CategoryRepository);
    this.answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
  }

  @Query(() => [Question])
  async allQuestions() {
    return this.questionRepository.find();
  }

  @Query(() => [Question])
  async question(@Arg('id', () => ID) id: string) {
    return this.questionRepository.findOne(id);
  }

  @Mutation(() => Question)
  async addQuestion(
    @Arg('questionInput', () => AddQuestionInput) questionInput: AddQuestionInput,
    @Arg('answerChoicesInput', () => [AddAnswerChoiceInput]) answerChoicesInput: AddAnswerChoiceInput[],
  ) {
    const question = this.questionRepository.create(questionInput);
    question.categories = await this.categoryRepository.findByIds(questionInput.categoryIds);
    question.answerChoices = answerChoicesInput.map((input) => this.answerChoiceRepository.create(input));
    return this.questionRepository.save(question);
  }

  @FieldResolver()
  async categories(@Root() question: Question) {
    return this.categoryRepository.findByIds(question.categoryIds);
  }

  @FieldResolver()
  async answerChoices(@Root() question: Question) {
    return this.answerChoiceRepository.find({ questionId: question.id });
  }
}
