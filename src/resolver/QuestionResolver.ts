import {
  Resolver, Query, Arg, ID, Mutation, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import QuestionRepository from '../repository/QuestionRepository';
import Question from '../entity/Question';
import AddQuestionInput from '../input/AddQuestionInput';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';
import CategoryRepository from '../repository/CategoryRepository';

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
  async questions(@Arg('ids', () => [ID]) ids: string[]) {
    return this.questionRepository.findByIds(ids);
  }

  @Query(() => Question)
  async question(@Arg('id', () => ID) id: string) {
    return this.questionRepository.findOne(id);
  }

  @Mutation(() => Question)
  async addQuestion(
    @Arg('questionInput', () => AddQuestionInput) questionInput: AddQuestionInput,
  ) {
    const question = this.questionRepository.create(questionInput);
    question.categories = await this.categoryRepository.findByIds(questionInput.categoryIds);
    question.answerChoices = await this.answerChoiceRepository.findByIds(questionInput.answerChoiceIds);
    return this.questionRepository.save(question);
  }

  @Mutation(() => Question)
  async removeQuestion(@Arg('id', () => ID) id: string) {
    return this.questionRepository.delete(id);
  }

  @FieldResolver()
  async categories(@Root() question: Question) {
    return this.categoryRepository.findByIds(question.categoryIds);
  }
}
