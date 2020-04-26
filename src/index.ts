import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import { stream, jsonFormat } from './config/logging';
import { MikroORM, EntityManager, RequestContext } from 'mikro-orm';
import { logger } from './config/logging';
import categories from './routes/categories';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

const app = express();

(async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;

  const migrator = DI.orm.getMigrator();
  await migrator.up();

  app.use(cors());
  app.use(express.json());

  app.use(morgan(jsonFormat, { stream }));

  app.use('/categories', categories);

  app.use((req: Request, res: Response, next: NextFunction) => {
    RequestContext.create(DI.orm.em, next);
  });

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    const status = error.status || 500;
    logger.error(error.message, {
      status,
      config: error.config,
      url: error.url,
      stack: error.stack,
      requestUrl: req.url,
      requestBody: req.body,
    });
    res.end(status);
  });

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})();
