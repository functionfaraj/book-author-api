import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED, CONFLICT, UNAUTHENTICATED } from './httpConstants'

export default class ErrorWrapper {
    constructor(message) {
        this.message = message
        this.code = INTERNAL_SERVER_ERROR // default
    }

    notFound(res) {
        this.code = NOT_FOUND
        this.send(res)
    }

    internalServerError(res) {
        this.code = INTERNAL_SERVER_ERROR

        if (this.message.indexOf("E11000") > -1) {
            this.code = CONFLICT
        }
        this.send(res)
    }

    unauthenticated(res) {
        this.code = UNAUTHENTICATED
        this.send(res)
    }

    unauthorized(res) {
        this.code = UNAUTHORIZED
        this.send(res)
    }

    send(res) {
        res.status(this.code)
        res.json({
            status: this.code,
            message: this.message
        })
    }
}