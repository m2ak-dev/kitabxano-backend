import { Request, Response } from 'express';
import { User } from '../models/User';
import { Book } from '../models/Book';
import { AddBookRequest, RemoveBookRequest } from '../types/index';

export class BookshelfController {
    private users: Map<string, User>;
    private bookIdCounter: number = 1;

    constructor(users: Map<string, User>) {
        this.users = users;
    }

    // Add book to user's bookshelf
    public async addBook(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { title, author, description, coverImage, rating }: AddBookRequest = req.body;

            // Validate input
            if (!title || !author) {
                res.status(400).json({ message: 'Title and author are required' });
                return;
            }

            // Check if user exists
            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const bookId = `book_${this.bookIdCounter++}`;
            const newBook = new Book(bookId, title, author, description, coverImage, rating);
            user.bookshelf.addBook(newBook);

            res.status(201).json({
                message: 'Book added to bookshelf',
                book: newBook,
                totalBooks: user.bookshelf.getBooksCount()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Remove book from user's bookshelf
    public async removeBook(req: Request, res: Response): Promise<void> {
        try {
            const { userId, bookId } = req.params;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const removed = user.bookshelf.removeBook(bookId);
            if (!removed) {
                res.status(404).json({ message: 'Book not found in bookshelf' });
                return;
            }

            res.status(200).json({
                message: 'Book removed from bookshelf',
                totalBooks: user.bookshelf.getBooksCount()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get user's bookshelf
    public async getBookshelf(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({
                message: 'Bookshelf retrieved successfully',
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                totalBooks: user.bookshelf.getBooksCount(),
                averageRating: user.bookshelf.getAverageRating(),
                books: user.bookshelf.getAllBooks(),
                createdDate: user.bookshelf.createdDate
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Search books in user's bookshelf
    public async searchBooks(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { query } = req.query;

            if (!query || typeof query !== 'string') {
                res.status(400).json({ message: 'Search query is required' });
                return;
            }

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const results = user.bookshelf.searchBooks(query);

            res.status(200).json({
                message: 'Search results',
                query,
                results,
                count: results.length
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get user's bookshelf statistics
    public async getBookshelfStats(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const books = user.bookshelf.getAllBooks();
            const averageRating = user.bookshelf.getAverageRating();
            const totalBooks = books.length;
            const highestRated = books.reduce((max, book) => 
                (book.rating || 0) > (max.rating || 0) ? book : max
            );

            res.status(200).json({
                message: 'Bookshelf statistics',
                userId: user.id,
                username: user.username,
                stats: {
                    totalBooks,
                    averageRating: parseFloat(averageRating.toFixed(2)),
                    highestRatedBook: highestRated || null
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get all bookshelves
    public async getAllBookshelves(req: Request, res: Response): Promise<void> {
        try {
            const bookshelves = Array.from(this.users.values()).map(user => ({
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                totalBooks: user.bookshelf.getBooksCount(),
                averageRating: user.bookshelf.getAverageRating()
            }));

            res.status(200).json({
                message: 'All bookshelves retrieved',
                bookshelves,
                count: bookshelves.length
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}
