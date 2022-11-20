import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import userRouter from './routes/user.router';
import transactionsRouter from './routes/transactions.router';
import errorMiddleware from './middleware/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.config();

    this.app.use('/user', userRouter);
    this.app.use('/transactions', transactionsRouter);

    this.app.get('/', (req, res) => res.status(StatusCodes.OK).json({ ok: true }));
    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
