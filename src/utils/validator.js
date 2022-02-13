import { body, params, param, query, validationResult } from 'express-validator'

export { body, params, param, query }

export const validate = (rules, customErrorFormat = null) => {
    return [
        rules, (req, res, next) => {
            const validation_errors = validationResult(req);
            if (!validation_errors.isEmpty()) {
                const status_code = 422
                let errors = validation_errors.array()
                if (typeof customErrorFormat == 'function') {
                    let new_errs = []
                    for (let i in errors) {
                        new_errs.push(customErrorFormat(errors[i]))
                    }

                    errors = [...new_errs];
                }

                return res.status(status_code).json({
                    message: "Validation Error", 
                    errors,
                    status_code: status_code
                });
            }
    
            next();
        }
    ]
}