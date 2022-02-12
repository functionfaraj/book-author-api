import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const generateAccessToken = (user) => {
    console.log('userGenerateAccessToken', user)
    return jwt.sign(user, process.env.TOKEN_HASH);
};

export const validateToken = (token, verify_option = {}) => {
    try {
        return jwt.verify(token, process.env.TOKEN_HASH, verify_option)
    } catch (e) {
        throw e
    }
}

export const refreshToken = (token, options = {}) => {
    let payload = validateToken(token, { ignoreExpiration: true })
    return generateToken({ _id: payload._id }, options)
}