import Admin from '@db/schemas/admin'
import * as hash from '@services/hash'
import { generateAccessToken } from '@services/token'
export const addAdmin = async ({ full_name, email, phone_number, password }) => {
    const newAdmin = await Admin.create({
        full_name,
        email,
        phone_number,
        password
    });
    return newAdmin;
};
export const logIn = async ({ username, password }) => {

    let admin = await Admin.findOne({ $or: [{ email: username.toLowerCase() }, { phone_number: username }] }).lean()
    if (admin) {
        const isCorrectPass = hash.compare(password, admin.password);
        if (isCorrectPass) {
            admin = {
                ...admin,
                isAdmin: true
            }
            const token = generateAccessToken({ user: admin })
            admin = {
                full_name: admin.full_name,
                email: admin.email,
                isAdmin: true,
                token
            }
            return admin;
        }
    }
    throw { message: 'Invalid Credintion' }
};
export const getAllAdmins = async ({ searchTerm }) => {
    let filter = {}
    if (searchTerm) {
        filter.$or =
            [
                {
                    email: new RegExp(searchTerm, 'i')
                },
                {
                    phone_number: new RegExp(searchTerm, 'i')
                },
                {
                    full_name: new RegExp(searchTerm, 'i')
                }
            ]
    }
    const admins = await Admin.find(filter).select({ password: 0 });
    return admins;
}
export const updateAdmin = async ({ full_name, email, phone_number, _id }) => {
    const admin = await Admin.findOne({ _id })
    if (!admin) {
        throw { type: 'notFound', message: 'Admin does  not  Exist' }
    }
    const updatedAdmin = await Admin.updateOne({ _id }, {
        full_name, email, phone_number
    })
    return updatedAdmin;
}
export const deleteAdmin = async (_id) => {
    const admin = await Admin.findOne({ _id })
    if (!admin) {
        throw { type: 'notFound', message: 'Admin does  not  Exist' }
    }
    await Admin.deleteById(_id)
    return true;
}