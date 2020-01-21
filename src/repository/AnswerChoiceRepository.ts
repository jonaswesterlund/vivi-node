import { EntityRepository, Repository } from 'typeorm';
import AnswerChoice from '../entity/AnswerChoice';

@EntityRepository(AnswerChoice)
export default class AnswerChoiceRepository extends Repository<AnswerChoice> {}
