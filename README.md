Here's a README file to explain the routes along with their types, body elements, and response structures:

# Project Name

This project is a Node.js and Express application for managing blogs, users, and resources. It includes user authentication, blog posting, approval, and other administrative functionalities.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Blog Routes](#blog-routes)
  - [Admin Routes](#admin-routes)
  - [Resource Routes](#resource-routes)
  - [Contact Route](#contact-route)
- [Response Structure](#response-structure)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables (see [Environment Variables](#environment-variables)).
4. Start the server:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:
```
MONGO_URI=your_mongo_db_connection_string
JWT_KEY=your_jwt_secret_key
EMAILPASS=your_email_password
PORT=your_port (optional, default is 5000)
NODE_ENV=development (or production)
```

## Routes

### User Routes

- **Register**
  - **URL:** `/user/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "User Name",
      "username": "username",
      "password": "password",
      "enrollment": "enrollment_number"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1,
      "success": "User successfully registered"
    }
    ```

- **Login**
  - **URL:** `/user/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1,
      "isLoggedin": true,
      "user": {
        "isAdmin": false,
        "name": "User Name",
        "_id": "user_id"
      },
      "token": "jwt_token"
    }
    ```

- **Get User Info**
  - **URL:** `/user/getUserInfo`
  - **Method:** `GET`
  - **Query Params:**
    - `token`: JWT token
  - **Response:**
    ```json
    {
      "isLoggedin": true,
      "user": {
        "isAdmin": false,
        "name": "User Name",
        "_id": "user_id"
      }
    }
    ```

- **Reset Password**
  - **URL:** `/user/resetPassword`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "username": "username",
      "enrollment": "enrollment_number",
      "password": "new_password"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 4,
      "success": "Password successfully reset"
    }
    ```

- **Get User Blogs**
  - **URL:** `/user/myblogs`
  - **Method:** `GET`
  - **Query Params:**
    - `userid`: User ID
  - **Response:**
    ```json
    {
      "data": [
        {
          "_id": "blog_id",
          "name": "Blog Name",
          "title": "Blog Title",
          "blog": "Blog Content",
          "date": "Date",
          "time": "Time",
          "userId": "user_id",
          "isApproved": false
        }
      ]
    }
    ```

### Blog Routes

- **Get Blogs**
  - **URL:** `/blog/blogs`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "message": 1,
      "data": [
        {
          "_id": "blog_id",
          "name": "Blog Name",
          "title": "Blog Title",
          "blog": "Blog Content",
          "date": "Date",
          "time": "Time",
          "userId": "user_id",
          "isApproved": true
        }
      ]
    }
    ```

- **Get Blog Data**
  - **URL:** `/blog/getBlogData`
  - **Method:** `GET`
  - **Query Params:**
    - `id`: Blog ID
  - **Response:**
    ```json
    {
      "data": {
        "_id": "blog_id",
        "name": "Blog Name",
        "title": "Blog Title",
        "blog": "Blog Content",
        "date": "Date",
        "time": "Time",
        "userId": "user_id",
        "isApproved": true
      }
    }
    ```

- **Post Blog**
  - **URL:** `/blog/postblog`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "Blog Name",
      "title": "Blog Title",
      "blog": "Blog Content",
      "userId": "user_id"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1
    }
    ```

- **Update Blog**
  - **URL:** `/blog/updateBlog`
  - **Method:** `POST`
  - **Query Params:**
    - `blogid`: Blog ID
  - **Body:**
    ```json
    {
      "name": "Updated Blog Name",
      "title": "Updated Blog Title",
      "blog": "Updated Blog Content"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1
    }
    ```

### Admin Routes

- **Get Pending Blogs**
  - **URL:** `/admin/pending`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "message": 1,
      "data": [
        {
          "_id": "blog_id",
          "name": "Blog Name",
          "title": "Blog Title",
          "blog": "Blog Content",
          "date": "Date",
          "time": "Time",
          "userId": "user_id",
          "isApproved": false
        }
      ]
    }
    ```

- **Approve Blog**
  - **URL:** `/admin/approve`
  - **Method:** `POST`
  - **Query Params:**
    - `id`: Blog ID
  - **Body:**
    ```json
    {
      "message": "Approval message"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1
    }
    ```

- **Reject Blog**
  - **URL:** `/admin/reject`
  - **Method:** `POST`
  - **Query Params:**
    - `id`: Blog ID
  - **Body:**
    ```json
    {
      "message": "Rejection message"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 2
    }
    ```

- **Delete Blog**
  - **URL:** `/admin/delete`
  - **Method:** `POST`
  - **Query Params:**
    - `id`: Blog ID
  - **Response:**
    ```json
    {
      "message": 3
    }
    ```

### Resource Routes

- **Get Resources**
  - **URL:** `/resources/getResources`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "message": 1,
      "data": [
        {
          "_id": "resource_id",
          "name": "Resource Name",
          "description": "Resource Description",
          "link": "Resource Link"
        }
      ]
    }
    ```

### Contact Route

- **Contact**
  - **URL:** `/contact`
  - **Method:** `POST`
  - **Query Params:**
    - `email`: User's email
  - **Body:**
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "text": "Message text"
    }
    ```
  - **Response:**
    ```json
    {
      "message": 1
    }
    ```

## Response Structure

- **Success Response:**
  ```json
  {
    "message": 1,
    "data": { ... } // data varies based on the route
  }
  ```

- **Error Response:**
  ```json
  {
    "message": 0,
    "error": "Error message"
  }
  ```

- **Token Required Response:**
  ```json
  {
    "isLoggedin": false,
    "user": { "isAdmin": false },
    "message": "TOKEN IS REQUIRED"
  }
  ```

- **Invalid Token Response:**
  ```json
  {
    "isLoggedin": false,
    "user": { "isAdmin": false },
    "message": "INVALID TOKEN"
  }
  ```

- **User Not Found or Mismatch Response:**
  ```json
  {
    "message

": 0,
    "error": "Username or password do not match."
  }
  ```

This README should provide a comprehensive overview of the routes, their types, required body elements, and response structures. Adjust the descriptions and examples based on your actual implementation if necessary.
