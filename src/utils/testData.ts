import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repository/CategoryRepository';
import QuestionRepository from '../repository/QuestionRepository';
import AnswerChoiceRepository from '../repository/AnswerChoiceRepository';

const initTestData = async () => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category1 = categoryRepository.create({ name: 'logik' });
  const category2 = categoryRepository.create({ name: 'algebra' });
  const category3 = categoryRepository.create({ name: 'analys' });
  const category4 = categoryRepository.create({ name: 'topologi' });
  const categories = await categoryRepository.save([category1, category2, category3, category4]);

  const answerChoiceRepository = getCustomRepository(AnswerChoiceRepository);
  const questionRepository = getCustomRepository(QuestionRepository);
  const questions = questionRepository.create([
    {
      content: 'Vad är en grupp?',
      answerChoices: answerChoiceRepository.create([
        answerChoiceRepository.create({ answer: 'a' }),
        answerChoiceRepository.create({ answer: 'b' }),
        answerChoiceRepository.create({ answer: 'c' }),
        answerChoiceRepository.create({ answer: 'd' }),
      ]),
      categories: [categories[1]],
    },
    {
      content: 'Vad är en öppen mängd?',
      answerChoices: answerChoiceRepository.create([
        answerChoiceRepository.create({ answer: 'a' }),
        answerChoiceRepository.create({ answer: 'b' }),
        answerChoiceRepository.create({ answer: 'c' }),
        answerChoiceRepository.create({ answer: 'd' }),
      ]),
      categories: [categories[3]],
    },
    {
      content: 'Vad är en Weierstrass sats?',
      answerChoices: answerChoiceRepository.create([
        answerChoiceRepository.create({ answer: 'a' }),
        answerChoiceRepository.create({ answer: 'b' }),
        answerChoiceRepository.create({ answer: 'c' }),
        answerChoiceRepository.create({ answer: 'd' }),
      ]),
      categories: [categories[2]],
    },
    {
      content: 'Vad är en sluten mängd?',
      answerChoices: answerChoiceRepository.create([
        answerChoiceRepository.create({ answer: 'a' }),
        answerChoiceRepository.create({ answer: 'b' }),
        answerChoiceRepository.create({ answer: 'c' }),
        answerChoiceRepository.create({ answer: 'd' }),
      ]),
      categories: [categories[3]],
    },
  ]);
  await questionRepository.save(questions);
};

export default initTestData;
