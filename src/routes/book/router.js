import express from 'express'
import * as controller from './controller';

import addUpdateValidator from './validators/addUpdate'

let router = express.Router();
router.get('/', controller.getAll)
router.get('/:_id', controller.getById)
router.post('/', addUpdateValidator, controller.add);
router.put('/:_id', addUpdateValidator, controller.update)
export default router;