import crypto from 'crypto'
require('dotenv').config();
export const encrypt = (text) => {
    if (!text) {
        throw new Error('Must provide a value to encrypt');
    }
    let hash = crypto.createHmac('sha512', process.env.CRYPTO_HASH);
    hash.update(text);
    let value = hash.digest('hex');
    return value
}
export const compare = (text, encrypted) => {
    if (encrypt(text) == encrypted) {
        return true
    }
    return false
}