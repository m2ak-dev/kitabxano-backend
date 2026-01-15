import { Request, Response } from 'express';
import { User } from '../models/User';
import { IUser, CreateUserRequest, UpdateUserRequest } from '../types/index';

export class UserController {
    // In-memory database with sample data
    private users: Map<string, User> = new Map();
    private userIdCounter: number = 3;

    constructor() {
        // Initialize with sample users for testing
        this.initializeSampleUsers();
    }

    private initializeSampleUsers() {
        // Sample user 1
        const user1 = new User('user_1', 'test@example.com', 'password123', 'testuser', 'Test User', undefined, 'Test user bio');
        this.users.set('user_1', user1);

        // Sample user 2
        const user2 = new User('user_2', 'admin@example.com', 'admin123', 'admin', 'Admin User', undefined, 'Admin bio');
        this.users.set('user_2', user2);
    }

    // Create a new user
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, username, fullName }: CreateUserRequest = req.body;

            // Validate input
            if (!email || !password || !username || !fullName) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }

            // Check if user already exists
            const existingUser = Array.from(this.users.values()).find(
                u => u.email === email || u.username === username
            );

            if (existingUser) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }

            const userId = `user_${this.userIdCounter++}`;
            const newUser = new User(userId, email, password, username, fullName);
            this.users.set(userId, newUser);

            res.status(201).json({
                message: 'User created successfully',
                user: newUser.getPublicProfile()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get user by ID
    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({
                message: 'User retrieved successfully',
                user: user.getPublicProfile()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = Array.from(this.users.values()).map(u => u.getPublicProfile());
            res.status(200).json({
                message: 'Users retrieved successfully',
                users
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Update user profile
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { username, fullName, bio, profilePicture }: UpdateUserRequest = req.body;

            const user = this.users.get(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            if (username) user.username = username;
            user.updateProfile(fullName || user.fullName, profilePicture, bio);

            res.status(200).json({
                message: 'User updated successfully',
                user: user.getPublicProfile()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Delete user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            if (!this.users.has(userId)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            this.users.delete(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Login user
    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: { email: string; password: string } = req.body;

            // Validate input
            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            // Find user by email
            const user = Array.from(this.users.values()).find(u => u.email === email);

            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Check password
            if (user.password !== password) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Return user with token (simple token = user email)
            res.status(200).json({
                message: 'Login successful',
                token: user.id,
                user: user.getPublicProfile()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get user by email
    public async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;

            const user = Array.from(this.users.values()).find(u => u.email === email);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({
                message: 'User retrieved successfully',
                user: user.getPublicProfile()
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get user profile by token
    public async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const user = this.users.get(token);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user.getPublicProfile());
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Get users list (helper method)
    public getUsers(): Map<string, User> {
        return this.users;
    }
}