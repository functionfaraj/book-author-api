import express from 'express'
import { authToken } from '../../utils/auth';
import * as controller from './controller';
let router = express.Router();
router.post('/', (req, res, next) => authToken(req, res, next, true), controller.addAdmin);
router.post('/login', controller.logIn);
router.get('/', (req, res, next) => authToken(req, res, next, true), controller.getAllAdmins)
router.put('/:_id', (req, res, next) => authToken(req, res, next, true), controller.updateAdmin)
router.delete('/:_id', (req, res, next) => authToken(req, res, next, true), controller.deleteAdmin)
export default router;