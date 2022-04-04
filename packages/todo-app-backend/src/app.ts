/**
 * Express App creation and configuration
 */
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { ClientErrorHandler, ErrorLoggerMiddleware } from './errors/error.middleware';
import tasksRouter from './tasks/tasks.router';

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_req: Request, res: Response) => res.send('pong'));
app.use('/tasks', tasksRouter);

// High level error handling
app.use(ErrorLoggerMiddleware);
app.use(ClientErrorHandler);

export default app;


