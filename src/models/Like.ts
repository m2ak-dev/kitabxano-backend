import { ILike, IUser, IPost } from '../types/index';

export class Like implements ILike {
    id: string;
    user: IUser;
    post: IPost;
    createdDate: Date;

    constructor(id: string, user: IUser, post: IPost) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.createdDate = new Date();
    }
}
