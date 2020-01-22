import {
  Resolver, Mutation, Arg, Query, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import Answer from '../entity/Answer';
import AnswerRepository from '../repository/AnswerRepository';
import AddAnswerInput from '../input/AddAnswerInput';
import QuestionRepository from '../repository/QuestionRepository';
import AnswerChoice from '../entity/AnswerChoice';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';
import Question from '../entity/Question';

@Resolver(() => Answer)
export default class AnswerResolver {
  answerRepository: AnswerRepository;

  answerChoiceRepository: AnswerChoiceRepository

  questionRepository: QuestionRepository;

  constructor() {
    this.answerRepository = getCustomRepository(AnswerRepository);
    this.answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
    this.questionRepository = getCustomRepository(QuestionRepository);
  }

  @Query(() => [Answer])
  async allAnswers() {
    return this.answerRepository.find();
  }

  @Mutation(() => Answer)
  async addAnswer(@Arg('addAnswerInput', () => AddAnswerInput) addAnswerInput: AddAnswerInput) {
    const question = await this.questionRepository.findOne(addAnswerInput.questionId, { relations: ['answerChoices'] });
    console.log('test');
    if (!question) {
      throw new Error('Question not found');
    }
    const answer = this.answerRepository.create({
      question,
      answerChoice: question.answerChoices.find((choice) => choice.id.toString() === addAnswerInput.answerChoiceId),
    });
    return this.answerRepository.save(answer);
  }

  @FieldResolver(() => AnswerChoice)
  async answerChoice(@Root() answer: Answer) {
    const loadedAnswer = await this.answerRepository.findOne(answer.id, { relations: ['answerChoice'] }) as Answer;
    return loadedAnswer.answerChoice;
  }

  @FieldResolver(() => Question)
  async question(@Root() answer: Answer) {
    const loadedAnswer = await this.answerRepository.findOne(answer.id, { relations: ['question'] }) as Answer;
    return loadedAnswer.question;
  }
}
