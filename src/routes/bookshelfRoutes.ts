import { Router, Express, Request, Response } from 'express';
import { BookshelfController } from '../controllers/bookshelfController';
import { authenticate } from '../middleware/auth';

const router = Router();

export function setBookshelfRoutes(app: Express, bookshelfController: BookshelfController) {
    app.use('/api/bookshelves', router);

    // Public routes
    router.get('/', (req: Request, res: Response) => 
        bookshelfController.getAllBookshelves(req, res));
    router.get('/:userId', (req: Request, res: Response) => 
        bookshelfController.getBookshelf(req, res));
    router.get('/:userId/stats', (req: Request, res: Response) => 
        bookshelfController.getBookshelfStats(req, res));

    // Protected routes
    router.post('/:userId/books', authenticate, (req: Request, res: Response) => 
        bookshelfController.addBook(req, res));
    router.delete('/:userId/books/:bookId', authenticate, (req: Request, res: Response) => 
        bookshelfController.removeBook(req, res));

    // Search route
    router.get('/:userId/search', (req: Request, res: Response) => 
        bookshelfController.searchBooks(req, res));
}
