import * as Service from './services'
import ErrorWrapper from '@utils/errorWrapper'
export const getAll = async (req, res) => {
    try {
        const { limit, page } = req.query
        const books = await Service.getAll({ limit, page })
        return res.send(books)
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
export const add = async (req, res) => {
    try {
        const { name, isbn, author } = req.body
        const book = await Service.add({ name, isbn, author })
        return res.send({ message: 'New book created Successfuly', status: true, book })
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
};
export const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const book = await Service.getById(_id)
        return res.send(book)
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
export const update = async (req, res) => {
    const { _id } = req.params
    const { name, isbn, author } = req.body
    try {
        await Service.update({ name, isbn, author, _id })
        res.send({ status: true, message: "Book updated Successfuly !" })
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
