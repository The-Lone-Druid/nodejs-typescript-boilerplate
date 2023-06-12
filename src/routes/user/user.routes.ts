import express from 'express';
import { UserControllers } from '../../controllers';
import { validateUser } from '../../middleware/validation.middleware';
import { paginationMiddleware } from '../../middleware/pagination.middleware';

const router = express.Router();

router.get('/', paginationMiddleware, UserControllers.getAllUsersController);
router.get('/:id', UserControllers.getUserByIdController);
router.post('/', validateUser, UserControllers.createUserController);
router.put('/:id', validateUser, UserControllers.updateUserController);
router.delete('/:id', UserControllers.deleteUserController);

export default router;
