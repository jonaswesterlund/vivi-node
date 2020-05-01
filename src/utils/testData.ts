import { DI } from '..';
import {
  Category,
  Question,
  AnswerChoice,
  QuestionEvaluation,
} from '../entities';

const initTestData = async () => {
  const categories = [new Category('Kategori 1'), new Category('Kategori 2')];
  const question1 = new Question('Fråga 1');
  const answerChoices1 = [
    new AnswerChoice('Svar 1'),
    new AnswerChoice('Svar 2'),
  ];
  const questionEvaluation = new QuestionEvaluation(
    'Detta är rätt',
    'Detta är fel'
  );
  questionEvaluation.correctAnswerChoice = answerChoices1[1];

  question1.answerChoices.set(answerChoices1);
  question1.categories.set(categories);
  question1.questionEvaluation = questionEvaluation;
  await DI.questionRepository.persistAndFlush(question1);
};

export default initTestData;
