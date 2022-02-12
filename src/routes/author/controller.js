import * as Service from './services'
import ErrorWrapper from '@utils/errorWrapper'
export const addAdmin = async (req, res) => {
    try {
        const { full_name, email, phone_number, password } = req.body
        const admin = await Service.addAdmin({ full_name, email, phone_number, password })
        return res.send({ message: 'New Admin created Successfuly', status: true, admin })
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
};
export const logIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const admin = await Service.logIn({ username, password })
        return res.send({ status: true, admin })
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
};
export const getAllAdmins = async (req, res) => {
    try {
        const { searchTerm } = req.query
        const admins = await Service.getAllAdmins({ searchTerm })
        return res.send(admins)
    } catch (error) {
        return new ErrorWrapper(error.message).internalServerError(res)
    }
}
export const updateAdmin = async (req, res) => {
    const { _id } = req.params
    const { full_name, email, phone_number } = req.body
    try {
        await Service.updateAdmin({ full_name, email, phone_number, _id })
        res.send({ status: true, message: "Admin updated Successfuly !" })
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }

}
export const deleteAdmin = async (req, res) => {
    const { _id } = req.params
    try {
        await Service.deleteAdmin(_id)
        res.send({ status: true, message: "Admin Deleted Successfuly !" })
    } catch (error) {
        if (error.type === 'notFound') {
            return new ErrorWrapper(error.message).notFound(res)
        }
        return new ErrorWrapper(error.message).internalServerError(res)
    }

}
