import { EntityRepository, Repository } from 'typeorm';
import QuestionEvaluation from '../entity/QuestionEvaluation';

@EntityRepository(QuestionEvaluation)
export default class QuestionEvaluationRepository extends Repository<QuestionEvaluation> { }
