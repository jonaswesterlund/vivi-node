import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import QuestionRepository from '../repository/QuestionRepository';
import Question from '../entity/Question';
import AddQuestionInput from '../input/AddQuestionInput';

@Resolver(() => Question)
export default class QuestionResolver {
  questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = getCustomRepository(QuestionRepository);
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
  async addQuestionAssessment(
    @Arg('questionInput', () => AddQuestionInput) questionInput: AddQuestionInput,
  ) {
    const question = this.questionRepository.create(questionInput);
    return this.questionRepository.save(question);
  }

  @Mutation(() => Question)
  async removeQuestion(@Arg('id', () => ID) id: string) {
    return this.questionRepository.delete(id);
  }
}
