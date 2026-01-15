import { IUser } from '../types/index';
import { UserBookshelf } from './UserBookshelf';

export class User implements IUser {
    id: string;
    email: string;
    password: string;
    username: string;
    fullName: string;
    profilePicture?: string;
    bio?: string;
    bookshelf: UserBookshelf;
    createdDate: Date;

    constructor(
        id: string,
        email: string,
        password: string,
        username: string,
        fullName: string,
        profilePicture?: string,
        bio?: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.fullName = fullName;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.bookshelf = new UserBookshelf(id);
        this.createdDate = new Date();
    }

    // Method to update user profile
    updateProfile(fullName: string, profilePicture?: string, bio?: string) {
        this.fullName = fullName;
        if (profilePicture) this.profilePicture = profilePicture;
        if (bio) this.bio = bio;
    }

    // Method to validate user password
    validatePassword(password: string): boolean {
        return this.password === password;
    }

    // Method to get user public profile (without password and bookshelf details)
    getPublicProfile() {
        const { password, ...publicProfile } = this;
        return publicProfile;
    }

    // Method to get user profile with bookshelf
    getProfileWithBookshelf() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            profilePicture: this.profilePicture,
            bio: this.bio,
            createdDate: this.createdDate,
            bookshelf: {
                totalBooks: this.bookshelf.getBooksCount(),
                averageRating: this.bookshelf.getAverageRating(),
                books: this.bookshelf.getAllBooks()
            }
        };
    }
}