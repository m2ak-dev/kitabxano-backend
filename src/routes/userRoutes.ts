import { Router, Express } from 'express';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

export function setUserRoutes(app: Express, userController: UserController) {
    app.use('/api/users', router);

    // Public routes
    router.post('/', (req, res) => userController.createUser(req, res));
    router.get('/', (req, res) => userController.getAllUsers(req, res));
    
    // Protected routes
    router.get('/:userId', authenticate, (req, res) => userController.getUser(req, res));
    router.put('/:userId', authenticate, (req, res) => userController.updateUser(req, res));
    router.delete('/:userId', authenticate, (req, res) => userController.deleteUser(req, res));
}