import {
  createCipheriv,
  createDecipheriv,
  createHash,
  pbkdf2Sync,
} from 'crypto';

export class CipherUtils {
  static encryptionMethod = 'aes-256-cbc';

  private static generateHashFromPassword(password: string): {
    key: string;
    encryptionIV: string;
  } {
    const salt = createHash('sha512').update(password).digest('hex');
    const staticHash = pbkdf2Sync(password, salt, 10000, 48, 'sha512').toString(
      'hex',
    );

    const key = staticHash.substring(0, 32);
    const encryptionIV = staticHash.substring(32, 48);

    return { key, encryptionIV };
  }

  static encryptData(data: string, password: string) {
    const { key, encryptionIV } = this.generateHashFromPassword(password);
    const cipher = createCipheriv(this.encryptionMethod, key, encryptionIV);
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');
  }

  // Decrypt data
  static decryptData(encryptedData: string, password: string) {
    const { key, encryptionIV } = this.generateHashFromPassword(password);
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = createDecipheriv(this.encryptionMethod, key, encryptionIV);
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    );
  }
}
