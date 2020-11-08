import './config';
import {
  Answer,
  AnswerChoice,
  Category,
  Question,
  QuestionEvaluation,
} from '../entities';
import { BaseEntity } from '../entities/BaseEntity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  entities: [
    Answer,
    AnswerChoice,
    BaseEntity,
    Category,
    Question,
    QuestionEvaluation,
  ],
  dbName: process.env.DATABASE_NAME,
  type: 'postgresql',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  migrations: {
    tableName: 'migrations',
    path: 'src/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
};
