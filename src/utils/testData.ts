import { DI } from '..';
import {
  Category,
  Question,
  AnswerChoice,
  QuestionEvaluation,
} from '../entities';

const initTestData = async () => {
  const categories = [
    new Category('Analys'),
    new Category('Logik'),
    new Category('Algebra'),
    new Category('Sannolikhet'),
  ];
  await DI.categoryRepository.persistAndFlush(categories);
  const question1 = new Question('Hur stort kan episolon vara som störst?');
  const question2 = new Question('Vad är sannolikheten av att jag är bäst?');
  const question3 = new Question(
    'Härled en sannolikhetstabell med naturlig deduktion?'
  );
  const question4 = new Question('Vad är skillnaden på en grupp och en ring?');
  const questions = [question1, question2, question3, question4];
  questions.forEach(q => {
    const answerChoices = [
      new AnswerChoice('Fel svar'),
      new AnswerChoice('Rätt svar'),
      new AnswerChoice('Mjeh svar'),
      new AnswerChoice('Njaa svar'),
    ];
    q.answerChoices.set(answerChoices);
    const questionEvaluation = new QuestionEvaluation(
      'Detta är rätt! :)',
      'Detta är fel! :('
    );
    questionEvaluation.correctAnswerChoice = answerChoices[1];
    q.questionEvaluation = questionEvaluation;
  });
  questions[0].categories.add(categories[0]);
  questions[1].categories.add(categories[3]);
  questions[2].categories.set([categories[1], categories[3]]);
  questions[3].categories.add(categories[2]); 

  await DI.questionRepository.persistAndFlush(questions);
};

export default initTestData;
