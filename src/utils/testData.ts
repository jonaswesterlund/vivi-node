import { DI } from '..';
import { Category, Question, AnswerChoice } from '../entities';

const initTestData = async () => {
  const categories = [new Category('kategori1'), new Category('kategori2')];
  const question1 = new Question('Fråga1');
  const answerChoices1 = [new AnswerChoice('Svar1')];

  question1.answerChoices.set(answerChoices1);
  question1.categories.set(categories);
  await DI.questionRepository.persistAndFlush(question1);
};

export default initTestData;
