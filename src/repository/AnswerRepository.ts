import { EntityRepository, Repository } from 'typeorm';
import Answer from '../entity/Answer';

@EntityRepository(Answer)
export default class AnswerRepository extends Repository<Answer> { }
