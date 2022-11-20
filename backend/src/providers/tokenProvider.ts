import { JwtPayload, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IToken } from '../interfaces/providers/IToken';

class tokenProvider implements IToken {
  private jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET as string;
  }

  generateToken(email: string): string {
    const token = sign({ data: email }, this.jwtSecret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  }

  checkToken(token: string): string {
    try {
      console.log(`checktoken${token}`);

      const response = verify(token, this.jwtSecret);
      console.log(response);

      if (!response) {
        const e = new Error('Token invalido');
        e.name = 'Unauthorized';
        throw e;
      }
      const { data } = response as JwtPayload;

      return data;
    } catch (err) {
      const e = new Error('Token invalido');
      e.name = 'Unauthorized';
      throw e;
    }
  }
}

export default tokenProvider;
