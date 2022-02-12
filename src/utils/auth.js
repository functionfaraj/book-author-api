import { validateToken } from "../services/token"

export const authToken = (req, res, next, isAdmin = false) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        const user = validateToken(token)
        if (user) {
            req.user = user.user
            if (isAdmin && user.user.isAdmin) {
                return next()
            } else {
                if (!isAdmin) {
                    return next()
                }
                res.send({ error: 'Admin Area' })
            }
        } else {
            res.send({ error: 'bad token' })
        }
    } else {
        res.send({ error: 'NOT auth' })
    }
}