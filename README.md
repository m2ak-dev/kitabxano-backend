# 📚 KitabXano Backend

A comprehensive backend API for the KitabXano (Book Treasure) application. Built with **TypeScript** and **Express.js**, providing complete user management, social post features, and personal book library (bookshelf) functionality.

## ✨ Features

- ✅ User Management (Create, Read, Update, Delete)
- ✅ Post Management (Create, Read, Update, Delete)
- ✅ Like/Unlike Posts
- ✅ Personal Book Shelves (Add, Remove, Rate Books)
- ✅ Book Management
- ✅ User Authentication Middleware
- ✅ Full REST API with TypeScript
- ✅ CORS enabled
- ✅ Request body parsing (JSON)
- ✅ In-memory data storage
- ✅ Uzbek Language Support

## 📁 Project Structure

```
social-network/
├── src/
│   ├── app.ts                      # Express app setup & configuration
│   ├── controllers/
│   │   ├── userController.ts       # User CRUD operations
│   │   ├── postController.ts       # Post CRUD & like operations
│   │   └── bookshelfController.ts  # Bookshelf management (NEW)
│   ├── models/
│   │   ├── User.ts                # User entity with profile
│   │   ├── Post.ts                # Post entity with interactions
│   │   ├── Like.ts                # Like relationship tracking
│   │   ├── Book.ts                # Book entity with metadata (NEW)
│   │   └── UserBookshelf.ts       # User's book collection (NEW)
│   ├── routes/
│   │   ├── userRoutes.ts          # /api/users endpoints
│   │   ├── postRoutes.ts          # /api/posts endpoints
│   │   └── bookshelfRoutes.ts     # /api/bookshelves endpoints (NEW)
│   ├── middleware/
│   │   └── auth.ts                # Bearer token authentication
│   └── types/
│       └── index.ts               # TypeScript interfaces
├── dist/                          # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript (installed via npm)

### Setup Steps

1. **Install dependencies**

```bash
cd social-network
npm install
```

2. **Build TypeScript to JavaScript**

```bash
npm run build
```

3. **Start the server**

```bash
npm start
```

Server will run on `http://localhost:5000`

## 🚀 API Endpoints

### Health Check
```
GET /api/health
```
Check if server is running.

### User Endpoints

#### Create User
```
POST /api/users
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "fullName": "Full Name"
}
Response: { "user": {...}, "message": "..." }
```

#### Get All Users
```
GET /api/users
Response: { "users": [...] }
```

#### Get User by ID
```
GET /api/users/:userId
Response: { "user": {...} }
```

#### Update User
```
PUT /api/users/:userId
Headers: Authorization: Bearer {userId}
Body: { "fullName": "New Name", "bio": "New bio" }
Response: { "user": {...} }
```

#### Delete User
```
DELETE /api/users/:userId
Headers: Authorization: Bearer {userId}
Response: { "message": "User deleted" }
```

### Post Endpoints

#### Create Post
```
POST /api/posts/:userId
Headers: Authorization: Bearer {userId}
Body: { "content": "Post content", "image": "image-url" }
Response: { "post": {...} }
```

#### Get All Posts
```
GET /api/posts
Response: { "posts": [...] }
```

#### Get Post by ID
```
GET /api/posts/:postId
Response: { "post": {...} }
```

#### Get User's Posts
```
GET /api/posts/user/:userId
Response: { "posts": [...] }
```

#### Update Post
```
PUT /api/posts/:postId
Headers: Authorization: Bearer {userId}
Body: { "content": "Updated content" }
Response: { "post": {...} }
```

#### Like Post
```
POST /api/posts/:postId/like/:userId
Headers: Authorization: Bearer {userId}
Response: { "message": "Post liked", "post": {...} }
```

#### Unlike Post
```
POST /api/posts/:postId/unlike/:userId
Headers: Authorization: Bearer {userId}
Response: { "message": "Post unliked", "post": {...} }
```

#### Delete Post
```
DELETE /api/posts/:postId
Headers: Authorization: Bearer {userId}
Response: { "message": "Post deleted" }
```

### Bookshelf Endpoints

#### Add Book to Shelf
```
POST /api/bookshelves/:userId/books
Headers: Authorization: Bearer {userId}
Body: {
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description",
  "coverImage": "image-url",
  "genre": "Fiction",
  "publishedDate": "2024-01-01"
}
Response: { "message": "Book added", "bookshelf": {...} }
```

#### Get User's Bookshelf
```
GET /api/bookshelves/:userId
Response: { "bookshelf": { "userId": "...", "books": [...] } }
```

#### Remove Book from Shelf
```
DELETE /api/bookshelves/:userId/books/:bookId
Headers: Authorization: Bearer {userId}
Response: { "message": "Book removed", "bookshelf": {...} }
```

#### Update Book Rating
```
PUT /api/bookshelves/:userId/books/:bookId/rating
Headers: Authorization: Bearer {userId}
Body: { "rating": 5 }
Response: { "message": "Rating updated", "bookshelf": {...} }
```

## 📊 Data Models

### User
```typescript
{
  id: string (UUID)
  email: string
  password: string
  username: string
  fullName: string
  profilePicture?: string
  bio?: string
  createdDate: Date
  bookshelf: UserBookshelf
}
```

### Post
```typescript
{
  id: string (UUID)
  author: string (userId)
  content: string
  image?: string
  createdDate: Date
  likesCount: number
  likedBy: string[] (array of userIds)
}
```

### Book
```typescript
{
  id: string (UUID)
  title: string
  author: string
  description?: string
  coverImage?: string
  rating?: number (0-5)
  genre?: string
  publishedDate?: Date
}
```

### UserBookshelf
```typescript
{
  userId: string
  books: Book[]
  methods: {
    addBook(book): void
    removeBook(bookId): void
    getUserBooks(): Book[]
    updateBookRating(bookId, rating): void
  }
}
```

### Like
```typescript
{
  id: string (UUID)
  user: string (userId)
  post: string (postId)
  createdDate: Date
}
```

## 🔐 Authentication

The API uses Bearer token authentication:

1. **Get user ID** from login/registration response
2. **Include Authorization header** in protected endpoints:
   ```
   Authorization: Bearer {userId}
   ```
3. The `auth` middleware validates the token and extracts the user ID

### Protected Endpoints
- `PUT /api/users/:userId`
- `DELETE /api/users/:userId`
- `POST /api/posts/:userId`
- `PUT /api/posts/:postId`
- `DELETE /api/posts/:postId`
- `POST /api/posts/:postId/like/:userId`
- `POST /api/posts/:postId/unlike/:userId`
- `POST /api/bookshelves/:userId/books`
- `DELETE /api/bookshelves/:userId/books/:bookId`
- `PUT /api/bookshelves/:userId/books/:bookId/rating`

## 🏗️ Project Setup

### TypeScript Configuration
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Source Maps**: Enabled

### Development Scripts

```bash
# Install dependencies
npm install

# Build (TypeScript → JavaScript)
npm run build

# Start server
npm start

# Watch mode (recompile on changes)
npm run dev
```

## 🗄️ Data Storage

Currently using **in-memory storage** with:
- `Map<string, User>` for users
- `Map<string, Post>` for posts
- `Map<string, Like>` for likes
- `Map<string, UserBookshelf>` for bookshelves

**Note**: Data persists only during server runtime. For production, integrate a database (MongoDB, PostgreSQL, etc.)

## 📦 Dependencies

Key packages:
- `express` (v4.17.1) - Web framework
- `typescript` (v4.5.4) - Type-safe JavaScript
- `ts-node` - Run TypeScript directly
- `cors` - Cross-Origin Resource Sharing
- `uuid` - Generate unique IDs

## 🚨 Error Handling

The API returns meaningful error messages:

```json
{
  "message": "User not found",
  "error": "404"
}
```

Common errors:
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing/invalid token
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server error

## 🔄 CORS Configuration

- **Allowed Origins**: `*` (all origins)
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, Authorization

## 🧪 Testing Endpoints

Use tools like:
- **Postman** - Visual API testing
- **curl** - Command-line requests
- **VS Code REST Client** - In-editor testing

Example curl command:
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Content-Type: application/json"
```

## 🌐 Frontend Integration

The frontend (React) connects to this API:
- Base URL: `http://localhost:5000/api`
- Implements all endpoint calls via `services/api.js`
- Uses Context API for authentication state
- Handles errors gracefully in UI

See `../social-network-frontend/README.md` for frontend documentation.

## 📝 Available Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/app.ts",
    "dev": "ts-node --watch src/app.ts"
  }
}
```

## 🎯 Next Steps for Production

1. **Database Integration**
   - Replace in-memory storage with PostgreSQL or MongoDB
   - Implement proper data persistence

2. **Authentication Enhancement**
   - Use JWT (JSON Web Tokens) instead of user IDs
   - Add password hashing (bcrypt)
   - Implement refresh tokens

3. **Input Validation**
   - Add request validation middleware
   - Sanitize input data

4. **Logging & Monitoring**
   - Add comprehensive logging
   - Implement error tracking
   - Monitor performance

5. **Testing**
   - Add unit tests
   - Add integration tests
   - Test coverage > 80%

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions:
- Check the API endpoints documentation above
- Review code comments in controller files
- Check console output for error messages
- Ensure all dependencies are installed correctly

---

**KitabXano Backend** - Powering Your Digital Book Library 📚⚙️
