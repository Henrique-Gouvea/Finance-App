import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces/helpers/IToken';

class tokenMiddleware {
  constructor(
    private tokenIn: IToken,
  ) { }

  checkTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        const e = new Error('Token inexistente');
        e.name = 'Unauthorized';
        throw e;
      }

      const data = this.tokenIn.checkToken(authorization);
      req.body.user = data;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default tokenMiddleware;
