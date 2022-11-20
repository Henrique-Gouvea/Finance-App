export interface ICrypto {
  encryptPassword(password: string): string;
  verifyPassword(password: string, passwordHash: string): boolean;
}
