import * as bcrypt from 'bcrypt';

export class BcryptLib {
  static getSalt(numberRounds: number) {
    return bcrypt.genSalt(numberRounds);
  }

  static hash(data: string, salt: string) {
    return bcrypt.hash(data, salt);
  }

  static compare(data1: string, data2: string) {
    return bcrypt.compare(data1, data2);
  }
}
