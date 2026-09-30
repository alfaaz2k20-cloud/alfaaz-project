import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export function getEncryptionKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
  }
  return Buffer.from(keyHex, 'hex');
}

export function encryptPII(text: string): { ciphertext: string; nonce: string; authTag: string } {
  const key = getEncryptionKey();
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, nonce);
  
  let ciphertext = cipher.update(text, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    ciphertext,
    nonce: nonce.toString('hex'),
    authTag
  };
}

export function decryptPII(ciphertext: string, nonceHex: string, authTagHex: string): string {
  const key = getEncryptionKey();
  const nonce = Buffer.from(nonceHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, nonce);
  decipher.setAuthTag(authTag);
  
  let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');
  
  return plaintext;
}
