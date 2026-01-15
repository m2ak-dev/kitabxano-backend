import express, { Express } from 'express';
import { UserController } from './controllers/userController';
import { PostController } from './controllers/postController';
import { BookshelfController } from './controllers/bookshelfController';
import { setUserRoutes } from './routes/userRoutes';
import { setPostRoutes } from './routes/postRoutes';
import { setBookshelfRoutes } from './routes/bookshelfRoutes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Initialize controllers
const userController = new UserController();
const postController = new PostController(userController.getUsers());
const bookshelfController = new BookshelfController(userController.getUsers());

// Routes
setUserRoutes(app, userController);
setPostRoutes(app, postController);
setBookshelfRoutes(app, bookshelfController);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'KitabXano Server is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 KitabXano Server is running on http://localhost:${PORT}`);
    console.log(`� API Documentation:`);
    console.log(`   - User endpoints: /api/users`);
    console.log(`   - Post endpoints: /api/posts`);
    console.log(`   - Bookshelf endpoints: /api/bookshelves`);
    console.log(`   - Health check: /api/health`);
});

export default app;