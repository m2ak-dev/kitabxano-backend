import { IUserBookshelf, IBook } from '../types/index';
import { Book } from './Book';

export class UserBookshelf implements IUserBookshelf {
    userId: string;
    books: IBook[];
    createdDate: Date;

    constructor(userId: string) {
        this.userId = userId;
        this.books = [];
        this.createdDate = new Date();
    }

    // Add book to bookshelf
    addBook(book: IBook): void {
        // Check if book already exists
        if (!this.books.some(b => b.id === book.id)) {
            this.books.push(book);
        }
    }

    // Remove book from bookshelf
    removeBook(bookId: string): boolean {
        const index = this.books.findIndex(b => b.id === bookId);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }

    // Get all books
    getAllBooks(): IBook[] {
        return this.books;
    }

    // Get total books count
    getBooksCount(): number {
        return this.books.length;
    }

    // Get average rating
    getAverageRating(): number {
        if (this.books.length === 0) return 0;
        const totalRating = this.books.reduce((sum, book) => sum + (book.rating || 0), 0);
        return totalRating / this.books.length;
    }

    // Search books in bookshelf
    searchBooks(query: string): IBook[] {
        const lowerQuery = query.toLowerCase();
        return this.books.filter(
            b => b.title.toLowerCase().includes(lowerQuery) ||
                 b.author.toLowerCase().includes(lowerQuery)
        );
    }
}
