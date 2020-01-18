import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repository/CategoryRepository';
import QuestionRepository from '../repository/QuestionRepository';

const initTestData = async () => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category1 = categoryRepository.create({ name: 'logik' });
  const category2 = categoryRepository.create({ name: 'algebra' });
  const category3 = categoryRepository.create({ name: 'analys' });
  const category4 = categoryRepository.create({ name: 'topologi' });
  const categories = await categoryRepository.save([category1, category2, category3, category4]);

  const questionRepository = getCustomRepository(QuestionRepository);
  const question1 = questionRepository.create({ content: 'Vad är en grupp?', answerChoices: [], categoryIds: [categories[1].id] });
  const question2 = questionRepository.create({ content: 'Vad är en öppen mängd?', answerChoices: [], categoryIds: [categories[3].id] });
  const question3 = questionRepository.create(
    { content: 'Vad är en Weierstrass sats?', answerChoices: [], categoryIds: [categories[2].id] },
  );
  const question4 = questionRepository.create({ content: 'Vad är en sluten mängd?', answerChoices: [], categoryIds: [categories[3].id] });
  await questionRepository.save([question1, question2, question3, question4]);
};

export default initTestData;
