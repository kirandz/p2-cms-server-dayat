# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /posts`
- `GET /posts`
- `GET /posts/:id`
- `DELETE /posts/:id`
- `PUT /posts/:id`
- `PATCH /posts/:id/:status`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:categoryId`
- `GET /logs`
- `POST /users/register`
- `POST /users/login`
- `POST /users/googleLogin`
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/googleSignIn`
- `GET /pub/posts`
- `GET /pub/likePosts`
- `POST /pub/likePosts/:postId`
- `GET /pub/posts/:postId`
- `GET /pub/categories`

&nbsp;

## 1. POST /posts

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- body:

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "Integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "Integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter the title"
}
OR
{
  "message": "Please input your content"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

&nbsp;

## 2. GET /posts

Description:

- Get all posts from database

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "Integer",
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "Integer",
    "authorId": "Integer",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "category": {
      "id": "Integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "user": {
      "userName": "string",
      "email": "string",
      "role": "string"
    }
  }
]
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

&nbsp;

## 3. GET /posts/:id

Description:

- Get post by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 4. DELETE /posts/:id

Description:

- Delete post by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Post success to delete"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You can delete your post only"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 5. PUT /posts/:id

Description:

- Edit post by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- body:

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "Integer"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Post status with id (id from params) updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter the title"
}
OR
{
  "message": "Please input your content"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You cannot update this post"
}
```

&nbsp;

## 6. PATCH /posts/:id/:status

Description:

- Edit post status by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "id": "integer (required)",
  "status": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Post status with id (id from params) has been updated from (old post status) to (updated post status/status from params)"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You cannot update this post"
}
```

&nbsp;

## 7. GET /categories

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Status",
    "createdAt": "2022-12-12T09:51:12.546Z",
    "updatedAt": "2022-12-12T09:51:12.546Z"
  },
  {
    "id": 2,
    "name": "Food",
    "createdAt": "2022-12-12T09:51:12.546Z",
    "updatedAt": "2022-12-12T09:51:12.546Z"
  }
]
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

&nbsp;

## 8. DELETE /categories/:categoryId

Description:

- Delete post by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "categoryId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category has been deleted"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 9. POST /categories

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter the category"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

## 10. POST /users/register

Request:

- body:

```json
{
  "userName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "userName": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input your email"
}
OR
{
  "message": "Please input your password"
}
OR
{
  "message": "Password must be at least 5 letters"
}
OR
{
  "message": "Email has been used"
}
```

&nbsp;

## 11. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "acesstoken": "string",
  "emailUser": "string",
  "UserName": "string",
  "role": "string"
}
```

_Response (401 - Bad Request)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 12. POST /users/googleLogin

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "acesstoken": "string",
  "role": "string",
  "UserName": "string"
}
```

&nbsp;

## 13. GET /logs

Description:

- Get all logs from database

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "postName": "string",
    "description": "string",
    "updatedBy": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

&nbsp;

## 14. POST /pub/register

Request:

- body:

```json
{
  "userName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "userName": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input your email"
}
OR
{
  "message": "Please input your password"
}
OR
{
  "message": "Password must be at least 5 letters"
}
OR
{
  "message": "Email has been used"
}
```

&nbsp;

## 15. POST /pub/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "acesstoken": "string",
  "UserName": "string"
}
```

_Response (401 - Bad Request)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 16. POST /pub/googleSignIn

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "acesstoken": "string",
  "UserName": "string"
}
```

&nbsp;

## 17. GET /pub/posts

Description:

- Get all posts from database

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

_Response (200 - OK)_

```json
{
  "items": [
    {
      "id": "Integer",
      "title": "string",
      "content": "string",
      "imgUrl": "string",
      "categoryId": "Integer",
      "authorId": "Integer",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date",
      "category": {
        "id": "Integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
      },
      "user": {
        "userName": "string",
        "email": "string",
        "role": "string"
      }
    }
  ],
  "totalPage": "integer"
}
```

&nbsp;

## 18. GET /pub/likePosts

Description:

- Get all like posts from  logged in customer from database

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

_Response (200 - OK)_

```json
{
  "items": [
    {
      "id": "Integer",
      "title": "string",
      "content": "string",
      "imgUrl": "string",
      "categoryId": "Integer",
      "authorId": "Integer",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date",
      "category": {
        "id": "Integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
      },
      "user": {
        "userName": "string",
        "email": "string",
        "role": "string"
      }
    }
  ],
  "totalPage": "integer"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

&nbsp;

## 19. POST /pub/likePosts/:postId

Description:

- Add post by id to favorite post

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "CustomerId": "integer", 
  "PostId": "integer"
}
```

_Response (401 - Error authentication)_

```json
{
  "message": "You have to login first"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 20. GET /pub/posts/:postId

Description:

- Get post by id

Request:

- headers:

```json
{
  "acesstoken": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "date",
  "updatedAt": "date",
  "category":{
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
  },
  "user":{
    "userName":"string"
  }
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 21. GET /pub/categories

Description:

- Get all categories from database

Request:

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Status",
    "createdAt": "2022-12-12T09:51:12.546Z",
    "updatedAt": "2022-12-12T09:51:12.546Z"
  },
  {
    "id": 2,
    "name": "Food",
    "createdAt": "2022-12-12T09:51:12.546Z",
    "updatedAt": "2022-12-12T09:51:12.546Z"
  }
]
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
