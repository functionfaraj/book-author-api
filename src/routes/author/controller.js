import * as Service from './services'
import ErrorWrapper from '@utils/errorWrapper'
export const getAll = async (req, res) => {
    try {
        const { limit, page } = req.query
        const authors = await Service.getAll({ limit, page })
        return res.send(authors)
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
export const add = async (req, res) => {
    try {
        const { first_name, last_name } = req.body
        const author = await Service.add({ first_name, last_name })
        return res.send({ message: 'New Author created Successfuly', status: true, author })
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
};
export const getById = async (req, res) => {
    try {
        const { _id } = req.params
        const author = await Service.getById(_id)
        return res.send(author)
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
export const update = async (req, res) => {
    const { _id } = req.params
    const { first_name, last_name } = req.body
    try {
        const author = await Service.update({ first_name, last_name, _id })
        res.send({ status: true, message: "Author updated Successfuly !", author })
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
