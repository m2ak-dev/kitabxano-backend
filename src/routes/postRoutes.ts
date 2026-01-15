import { Router, Express, Request, Response } from 'express';
import { PostController } from '../controllers/postController';
import { authenticate } from '../middleware/auth';

const router = Router();

export function setPostRoutes(app: Express, postController: PostController) {
    app.use('/api/posts', router);

    // Public routes
    router.get('/', (req: Request, res: Response) => postController.getAllPosts(req, res));
    router.get('/:postId', (req: Request, res: Response) => postController.getPost(req, res));

    // Protected routes
    router.post('/:userId', authenticate, (req: Request, res: Response) => 
        postController.createPost(req, res));
    router.get('/user/:userId', (req: Request, res: Response) => 
        postController.getPostsByUser(req, res));
    router.put('/:postId', authenticate, (req: Request, res: Response) => 
        postController.updatePost(req, res));
    router.delete('/:postId', authenticate, (req: Request, res: Response) => 
        postController.deletePost(req, res));

    // Like routes
    router.post('/:postId/like/:userId', authenticate, (req: Request, res: Response) => 
        postController.likePost(req, res));
    router.post('/:postId/unlike/:userId', authenticate, (req: Request, res: Response) => 
        postController.unlikePost(req, res));
}