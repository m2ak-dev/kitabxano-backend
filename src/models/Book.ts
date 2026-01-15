import { IBook } from '../types/index';

export class Book implements IBook {
    id: string;
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    rating?: number;
    addedDate: Date;

    constructor(
        id: string,
        title: string,
        author: string,
        description?: string,
        coverImage?: string,
        rating?: number
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.coverImage = coverImage;
        this.rating = rating;
        this.addedDate = new Date();
    }
}
