import express from 'express'
import * as controller from './controller';
let router = express.Router();
router.get('/', controller.getAll)
router.get('/:_id', controller.getById)
router.post('/', controller.add);
router.put('/:_id', controller.update)
export default router;