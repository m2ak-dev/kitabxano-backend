// Book Interface
export interface IBook {
    id: string;
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    rating?: number;
    addedDate: Date;
}

// User Bookshelf Interface
export interface IUserBookshelf {
    userId: string;
    books: IBook[];
    createdDate: Date;
}

// User Interface
export interface IUser {
    id: string;
    email: string;
    password: string;
    username: string;
    fullName: string;
    profilePicture?: string;
    bio?: string;
    bookshelf?: IUserBookshelf;
    createdDate: Date;
}

// Post Interface
export interface IPost {
    id: string;
    author: IUser;
    content: string;
    image?: string;
    createdDate: Date;
    likesCount: number;
    likedBy: IUser[];
}

// Like Interface
export interface ILike {
    id: string;
    user: IUser;
    post: IPost;
    createdDate: Date;
}

// Request/Response Types
export interface AuthRequest {
    email: string;
    password: string;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    username: string;
    fullName: string;
}

export interface UpdateUserRequest {
    username?: string;
    fullName?: string;
    bio?: string;
    profilePicture?: string;
}

export interface CreatePostRequest {
    content: string;
    image?: string;
}

export interface UpdatePostRequest {
    content?: string;
    image?: string;
}

export interface LikeRequest {
    postId: string;
}

// Book Management Requests
export interface AddBookRequest {
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    rating?: number;
}

export interface RemoveBookRequest {
    bookId: string;
}