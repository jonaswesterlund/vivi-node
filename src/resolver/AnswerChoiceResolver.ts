import {
  Resolver, Query, Arg, ID, Mutation, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import QuestionRepository from '../repository/QuestionRepository';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';
import AnswerChoice from '../entity/AnswerChoice';
import AddAnswerChoiceInput from '../input/AddAnswerChoiceInput';
import Question from '../entity/Question';

@Resolver(() => AnswerChoice)
export default class AnswerChoiceResolver {
  answerChoiceRepository: AnswerChoiceRepository;

  questionRepository: QuestionRepository;

  constructor() {
    this.answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
    this.questionRepository = getCustomRepository(QuestionRepository);
  }

  @Query(() => [AnswerChoice])
  async allAnswerChoices() {
    return this.answerChoiceRepository.find();
  }

  @Query(() => [AnswerChoice])
  async answerChoices(@Arg('ids', () => [ID]) ids: string[]) {
    return this.answerChoiceRepository.findByIds(ids);
  }

  @Query(() => AnswerChoice)
  async answerChoice(@Arg('id', () => ID) id: string) {
    return this.answerChoiceRepository.findOne(id);
  }

  @Mutation(() => AnswerChoice)
  async addAnswerChoice(
    @Arg('answerChoiceInput', () => AddAnswerChoiceInput) answerChoiceInput: AddAnswerChoiceInput,
  ) {
    const answerChoice = this.answerChoiceRepository.create(answerChoiceInput);
    answerChoice.question = await this.questionRepository.findOne(answerChoiceInput.questionId) as Question;
    return this.answerChoiceRepository.save(answerChoice);
  }

  @Mutation(() => AnswerChoice)
  async removeAnswerChoice(@Arg('id', () => ID) id: string) {
    return this.answerChoiceRepository.delete(id);
  }

  @FieldResolver()
  async question(@Root() answerChoice: AnswerChoice) {
    return this.answerChoiceRepository.findOne(answerChoice.questionId);
  }
}
