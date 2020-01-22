import {
  Resolver, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import AnswerChoice from '../entity/AnswerChoice';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';

@Resolver(() => AnswerChoice)
export default class AnswerChoiceResolver {
  answerChoiceRepository: AnswerChoiceRepository;

  constructor() {
    this.answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
  }

  @FieldResolver()
  async question(@Root() answerChoice: AnswerChoice) {
    const loadedAnswerChoice = await this.answerChoiceRepository.findOne(answerChoice.id, { relations: ['question'] }) as AnswerChoice;
    return loadedAnswerChoice.question;
  }
}
