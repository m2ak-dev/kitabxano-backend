import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { Like } from '../models/Like';
import { User } from '../models/User';
import { CreatePostRequest, UpdatePostRequest, LikeRequest } from '../types/index';

export class PostController {
    // In-memory database (for demonstration)
    private posts: Map<string, Post> = new Map();
    private likes: Map<string, Like> = new Map();
    private postIdCounter: number = 1;
    private likeIdCounter: number = 1;
    private users: Map<string, User>;

    constructor(users: Map<string, User>) {
        this.users = users;
    }

    // Create a new post
    public async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { content, image }: CreatePostRequest = req.body;

            // Validate input
            if (!content) {
                res.status(400).json({ message: 'Content is required' });
                return;
            }

            // Check if user exists
            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const postId = `post_${this.postIdCounter++}`;
            const newPost = new Post(postId, user, content, image);
            this.posts.set(postId, newPost);

            res.status(201).json({
                message: 'Post created successfully',
                post: newPost
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get post by ID
    public async getPost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params;

            const post = this.posts.get(postId);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            res.status(200).json({
                message: 'Post retrieved successfully',
                post
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get all posts
    public async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = Array.from(this.posts.values());
            res.status(200).json({
                message: 'Posts retrieved successfully',
                posts
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get posts by user
    public async getPostsByUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const userPosts = Array.from(this.posts.values()).filter(
                p => p.author.id === userId
            );

            res.status(200).json({
                message: 'User posts retrieved successfully',
                posts: userPosts
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Update post
    public async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params;
            const { content, image }: UpdatePostRequest = req.body;

            const post = this.posts.get(postId);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            post.updateContent(content || post.content, image);

            res.status(200).json({
                message: 'Post updated successfully',
                post
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Like a post
    public async likePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId, userId } = req.params;

            const post = this.posts.get(postId);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            if (post.isLikedBy(userId)) {
                res.status(400).json({ message: 'Post already liked by this user' });
                return;
            }

            post.likePost(user);
            const likeId = `like_${this.likeIdCounter++}`;
            const like = new Like(likeId, user, post);
            this.likes.set(likeId, like);

            res.status(200).json({
                message: 'Post liked successfully',
                post
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Unlike a post
    public async unlikePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId, userId } = req.params;

            const post = this.posts.get(postId);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            if (!post.isLikedBy(userId)) {
                res.status(400).json({ message: 'Post not liked by this user' });
                return;
            }

            post.unlikePost(userId);

            // Remove like from likes map
            const likeToDelete = Array.from(this.likes.values()).find(
                l => l.user.id === userId && l.post.id === postId
            );
            if (likeToDelete) {
                this.likes.delete(likeToDelete.id);
            }

            res.status(200).json({
                message: 'Post unliked successfully',
                post
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Delete post
    public async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params;

            if (!this.posts.has(postId)) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            this.posts.delete(postId);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get posts (helper method)
    public getPosts(): Map<string, Post> {
        return this.posts;
    }
}