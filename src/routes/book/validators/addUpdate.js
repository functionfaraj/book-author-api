import { body, validate } from '@utils/validator'
import { validateAuthorId } from '../services'

const rules = [
    body('name')
        .exists().withMessage('This field is required'),
    body('isbn')
        .exists().withMessage('This field is required'),
    body('author')
        .exists().withMessage('This field is required')
        .custom(validateAuthorId)
]

export default validate(rules)
