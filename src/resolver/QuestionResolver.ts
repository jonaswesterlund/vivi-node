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
import AddQuestionEvaluationInput from '../input/AddQuestionEvaluationInput';
import AnswerChoice from '../entity/AnswerChoice';

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
  ) {
    const question = this.questionRepository.create(questionInput);
    const correctAnswer = questionInput.answerChoiceInputs.find((answerChoice) => !!answerChoice.isCorrect) as AddAnswerChoiceInput;
    const createdCorrectAnswer = this.answerChoiceRepository.create(correctAnswer);
    const answerChoices = questionInput.answerChoiceInputs.map((input) => this.answerChoiceRepository.create(input));
    console.log(question, answerChoices);
    const [loadedCategories, loadedAnswerChoices] = await Promise.all(
      [this.categoryRepository.findByIds(questionInput.categoryIds), this.answerChoiceRepository.save(answerChoices)]
    );
    question.categories = loadedCategories;
    question.answerChoices = loadedAnswerChoices;
    return this.questionRepository.save(question);
  }

  @FieldResolver()
  async answers(@Root() question: Question) {
    const loadedQuestion = await this.questionRepository.findOne(question.id, { relations: ['answers'] }) as Question;
    return loadedQuestion.answers;
  }

  @FieldResolver()
  async categories(@Root() question: Question) {
    const loadedQuestion = await this.questionRepository.findOne(question.id, { relations: ['categories'] }) as Question;
    return loadedQuestion.categories;
  }

  @FieldResolver()
  async answerChoices(@Root() question: Question) {
    const loadedQuestion = await this.questionRepository.findOne(question.id, { relations: ['answerChoices'] }) as Question;
    return loadedQuestion.answerChoices;
  }

  @FieldResolver()
  async questionEvaluation(@Root() question: Question) {
    const loadedQuestion = await this.questionRepository.findOne(question.id, { relations: ['questionEvaluation'] }) as Question;
    return loadedQuestion.questionEvaluation;
  }
}
