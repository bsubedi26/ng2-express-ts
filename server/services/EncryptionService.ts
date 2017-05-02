
import * as crypto from 'crypto'

interface Iencryption {
  encryptText(text: string): string;
  decryptText(text: string): string;
  testTextEncryption(string): void;
  
  encryptBuffer(buffer: Buffer): Buffer;
  decryptBuffer(buffer: Buffer): Buffer;
  testBufferEncryption(buffer: Buffer): void;
  
}

class EncryptionService implements Iencryption {
  algorithm: string = 'aes-256-ctr'
  password: string = 'd6F3Efeq';
  public anotherVar: string = 'ANOTHER ONE'
  protected func: Function = this.encryptText
  protected func2: Function = this.decryptText
  password2: string;

  public static availableOutside() {
    return 5
  }

  // Encrypt and decrypt text
  encryptText(text: string): string {
    const cipher = crypto.createCipher(this.algorithm, this.password)
    console.log('enc called')
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  decryptText(text: string): string {
    const decipher = crypto.createDecipher(this.algorithm, this.password)
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  testTextEncryption(string): void {
    const encrypted = this.encryptText(string)
    console.log('Text encrypted --> ', encrypted)
    const decrypted = this.decryptText(encrypted)
    console.log('Text decrypted --> ', decrypted)
  }

  encryptBuffer(buffer: Buffer): Buffer {
    const cipher = crypto.createCipher(this.algorithm, this.password)
    const crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
  }

  decryptBuffer(buffer: Buffer): Buffer {
    const decipher = crypto.createDecipher(this.algorithm, this.password)
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
  }

  testBufferEncryption(buffer: Buffer): void {
    const encryptedBuffer = this.encryptBuffer(buffer)
    console.log("Buffer encrypted --> ", encryptedBuffer);
    console.log("Buffer decrypted --> ", this.decryptBuffer(encryptedBuffer).toString('utf8'));
  }

}

class TestInject {
  serv: EncryptionService
  constructor(public enc: EncryptionService) {
    console.log('een', enc)
    // enc.func('testing one')
  }
}

let enc = new EncryptionService()
let test = new TestInject(enc)
export { EncryptionService }
// Encrypt and decrypt streams
// const fs = require('fs');
// const zlib = require('zlib');
// // input file
// const r = fs.createReadStream('file.txt');
// // zip content
// const zip = zlib.createGzip();
// // encrypt content
// const encryptStream = crypto.createCipher(algorithm, password);
// // decrypt content
// const decryptStream = crypto.createDecipher(algorithm, password)
// // unzip content
// const unzip = zlib.createGunzip();
// // write file
// const w = fs.createWriteStream('file.txt');

// // start pipe
// r.pipe(zip).pipe(encryptStream).pipe(decryptStream).pipe(unzip).pipe(w);