export interface IToken {
  generateToken(username: string): string;
  checkToken(token: string): string;
}
