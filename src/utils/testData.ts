import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repository/CategoryRepository';
import QuestionRepository from '../repository/QuestionRepository';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';
import AnswerChoice from '../entity/AnswerChoice';

const initTestData = async () => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category1 = categoryRepository.create({ name: 'logik' });
  const category2 = categoryRepository.create({ name: 'algebra' });
  const category3 = categoryRepository.create({ name: 'analys' });
  const category4 = categoryRepository.create({ name: 'topologi' });
  const categories = await categoryRepository.save([category1, category2, category3, category4]);

  const answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
  let answerChoices: AnswerChoice[] = [];
  for (let i = 0; i < 4; i += 1) {
    answerChoices = [
      ...answerChoices,
      answerChoiceRepository.create({ answer: 'a' }),
      answerChoiceRepository.create({ answer: 'b' }),
      answerChoiceRepository.create({ answer: 'c' }),
      answerChoiceRepository.create({ answer: 'd' }),
    ];
  }
  const answerChoices1 = await answerChoiceRepository.save([answerChoice1, answerChoice2, answerChoice3, answerChoice4]);
  console.log(answerChoices1);

   const questionRepository = getCustomRepository(QuestionRepository);
  const question1 = questionRepository.create({ content: 'Vad är en grupp?', answerChoiceIds: answerChoices1.map((choice) => choice.id), categoryIds: [categories[1].id] });
  const question2 = questionRepository.create({ content: 'Vad är en öppen mängd?', answerChoiceIds: answerChoices1.map((choice) => choice.id), categoryIds: [categories[3].id] });
  const question3 = questionRepository.create(
    { content: 'Vad är en Weierstrass sats?', answerChoiceIds: answerChoices1.map((choice) => choice.id), categoryIds: [categories[2].id] },
  );
  const question4 = questionRepository.create({ content: 'Vad är en sluten mängd?', answerChoiceIds: answerChoices1.map((choice) => choice.id), categoryIds: [categories[3].id] });
  const questions = await questionRepository.save([question1, question2, question3, question4]);

  await answerChoiceRepository.update(answerChoices1.map((choice) => ({ ...choice, questionId: question1.id })));
};

export default initTestData;
