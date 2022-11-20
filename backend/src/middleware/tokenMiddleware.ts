import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces/providers/IToken';

class tokenMiddleware {
  constructor(
    private tokenIn: IToken,
  ) { }

  checkTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
      const { authorization } = req.headers;
      console.log(authorization);

      if (!authorization) {
        const e = new Error('Token inexistente');
        e.name = 'Unauthorized';
        throw e;
      }

      const data = this.tokenIn.checkToken(authorization);
      req.body.user = data;
      console.log(data);

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default tokenMiddleware;
