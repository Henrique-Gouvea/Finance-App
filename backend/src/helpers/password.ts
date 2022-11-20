import bcrypt from 'bcrypt';
import 'dotenv/config';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },

  verifyPassword: (password: string, passwordDB: string) => {
    const verifyPassword = bcrypt.compare(password, passwordDB);
    return verifyPassword;
  },
};

export default passwordService;
