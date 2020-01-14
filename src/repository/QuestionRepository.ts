import { EntityRepository, Repository } from 'typeorm';
import Question from '../entity/Question';

@EntityRepository(Question)
export default class QuestionRepository extends Repository<Question> {}
