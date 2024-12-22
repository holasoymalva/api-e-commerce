import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { RegisterSchema, UpdateProfileSchema } from '../schemas/user.schema';

const router = Router();
const userController = new UserController(new UserService());

router.post('/register', validateRequest(RegisterSchema), userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

// Protected routes
router.use(authMiddleware);
router.get('/profile', userController.getProfile.bind(userController));
router.put('/profile', validateRequest(UpdateProfileSchema), userController.updateProfile.bind(userController));

export default router;
