import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
// import csurf from 'csurf';
import apiRouter from './api/routes';
import { logger } from './libs';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(helmet());
app.use(compression());
// you must use csurf in real projects
// app.use(csurf({ cookie: true }));
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message)
    }
  })
);

app.use('/', apiRouter);

export default app;
