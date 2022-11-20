import bcrypt from 'bcrypt';
import { ICrypto } from '../interfaces/providers/ICrypto';

class cryptoProvider implements ICrypto {
  constructor(private teste: string = 'teste') { }

  encryptPassword(password: string) {
    console.log(this.encryptPassword);

    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  }

  verifyPassword(password: string, passwordHash: string): boolean {
    console.log(this.verifyPassword);

    const verifyPassword: boolean = bcrypt.compareSync(password, passwordHash);
    return verifyPassword;
  }
}

export default cryptoProvider;
