# 📱 Social Network Application

A complete social network application built with **TypeScript** and **Express.js**. Users can create accounts, manage profiles, create posts, and interact with other users' content through likes.

## ✨ Features

- ✅ User Management (Create, Read, Update, Delete)
- ✅ Post Management (Create, Read, Update, Delete)
- ✅ Like/Unlike Posts
- ✅ User Authentication Middleware
- ✅ Full REST API

## 📁 Project Structure

```
social-network/
├── src/
│   ├── app.ts                    # Express app setup
│   ├── controllers/
│   │   ├── userController.ts     # User business logic
│   │   └── postController.ts     # Post business logic
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Post.ts              # Post model
│   │   └── Like.ts              # Like model
│   ├── routes/
│   │   ├── userRoutes.ts         # User API routes
│   │   └── postRoutes.ts         # Post API routes
│   ├── middleware/
│   │   └── auth.ts              # Authentication middleware
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd social-network
```

2. **Install dependencies**

```bash
npm install
```

3. **Build TypeScript**

```bash
npm run build
```

4. **Start the server**

```bash
npm start
```

The server will run on `http://localhost:3000`

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### User Endpoints

#### Create User

- **POST** `/users`
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "john_doe",
  "fullName": "John Doe"
}
```

#### Get All Users

- **GET** `/users`

#### Get User by ID

- **GET** `/users/:userId`
- **Headers:** `Authorization: Bearer <userId>`

#### Update User

- **PUT** `/users/:userId`
- **Headers:** `Authorization: Bearer <userId>`
- **Body:**

```json
{
  "fullName": "Jane Doe",
  "bio": "Software Developer",
  "profilePicture": "https://example.com/pic.jpg"
}
```

#### Delete User

- **DELETE** `/users/:userId`
- **Headers:** `Authorization: Bearer <userId>`

### Post Endpoints

#### Create Post

- **POST** `/posts/:userId`
- **Headers:** `Authorization: Bearer <userId>`
- **Body:**

```json
{
  "content": "Hello World!",
  "image": "https://example.com/image.jpg"
}
```

#### Get All Posts

- **GET** `/posts`

#### Get Post by ID

- **GET** `/posts/:postId`

#### Get User's Posts

- **GET** `/posts/user/:userId`

#### Update Post

- **PUT** `/posts/:postId`
- **Headers:** `Authorization: Bearer <userId>`
- **Body:**

```json
{
  "content": "Updated content",
  "image": "https://example.com/new-image.jpg"
}
```

#### Like Post

- **POST** `/posts/:postId/like/:userId`
- **Headers:** `Authorization: Bearer <userId>`

#### Unlike Post

- **POST** `/posts/:postId/unlike/:userId`
- **Headers:** `Authorization: Bearer <userId>`

#### Delete Post

- **DELETE** `/posts/:postId`
- **Headers:** `Authorization: Bearer <userId>`

### Health Check

- **GET** `/health`
- Returns: `{ "message": "Server is running" }`

## 📋 Data Models

### User

```typescript
interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  createdDate: Date;
}
```

### Post

```typescript
interface IPost {
  id: string;
  author: IUser;
  content: string;
  image?: string;
  createdDate: Date;
  likesCount: number;
  likedBy: IUser[];
}
```

### Like

```typescript
interface ILike {
  id: string;
  user: IUser;
  post: IPost;
  createdDate: Date;
}
```

## 🔐 Authentication

The API uses a simple Bearer token authentication. Include the user ID in the Authorization header:

```
Authorization: Bearer <userId>
```

**Note:** In production, implement JWT tokens for better security.

## 📦 Dependencies

- **express**: Web framework
- **typescript**: Language for static typing
- **@types/express**: TypeScript definitions for Express

## 🛠️ Development

### Available Scripts

- `npm start` - Start the server
- `npm run build` - Build TypeScript files
- `npm test` - Run tests

### TypeScript Configuration

The project uses `tsconfig.json` for TypeScript configuration with:

- Target: ES2020
- Module: CommonJS
- Strict mode enabled

## 💡 Usage Example

### Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123",
    "username": "john_doe",
    "fullName": "John Doe"
  }'
```

### Create a Post

```bash
curl -X POST http://localhost:3000/api/posts/user_1 \
  -H "Authorization: Bearer user_1" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "My first post!"
  }'
```

### Like a Post

```bash
curl -X POST http://localhost:3000/api/posts/post_1/like/user_2 \
  -H "Authorization: Bearer user_2"
```

## 📝 License

This project is open source and available under the ISC License.
│ │ └── auth.ts
│ └── types
│ └── index.ts
├── package.json
├── tsconfig.json
└── README.md

```

## Features

- User registration and authentication
- Profile management
- Creating, retrieving, and liking posts

## Installation

1. Clone the repository:
```

git clone <repository-url>

```
2. Navigate to the project directory:
```

cd social-network

```
3. Install the dependencies:
```

npm install

```

## Usage

1. Start the application:
```

npm start

```
2. The application will run on `http://localhost:3000`.

## API Endpoints

- **User Routes**
- `POST /users` - Create a new user
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user information

- **Post Routes**
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get post details
- `POST /posts/:id/like` - Like a post

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License.
```
