import { IPost, IUser } from '../types/index';

export class Post implements IPost {
    id: string;
    author: IUser;
    content: string;
    image?: string;
    createdDate: Date;
    likesCount: number;
    likedBy: IUser[];

    constructor(id: string, author: IUser, content: string, image?: string) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.image = image;
        this.createdDate = new Date();
        this.likesCount = 0;
        this.likedBy = [];
    }

    // Method to add a like
    likePost(user: IUser): void {
        if (!this.likedBy.some(u => u.id === user.id)) {
            this.likedBy.push(user);
            this.likesCount++;
        }
    }

    // Method to remove a like
    unlikePost(userId: string): void {
        const index = this.likedBy.findIndex(u => u.id === userId);
        if (index !== -1) {
            this.likedBy.splice(index, 1);
            this.likesCount--;
        }
    }

    // Method to check if user liked the post
    isLikedBy(userId: string): boolean {
        return this.likedBy.some(u => u.id === userId);
    }

    // Method to update post content
    updateContent(content: string, image?: string): void {
        this.content = content;
        if (image) this.image = image;
    }
}