# Blog API

An API for creating, viewing, editing and deleting blogs using:

* Express
* Mongoose
* MongoDB

This module allows for includes commenting functionality for these
blogs. This including creating, viewing editing and deleting comments.

## Prerequisites
The blog takes an `ObjectId` that is used to identify the user that
created the blog. This `ObjectId` is used as a ref to a separate schema
that identifies the user. This module does not include the schema, but
instead allows the consumer to create their own `User` schema and pass
its name to the module, which will be populated.

This can be done by setting the Node environment variable
`USER_SCHEMA_NAME`, which has a default value of `User` if not
provided. 

## Getting Started with the Demo App

To test the API, you can run the demo app. First, create a file
called `config.json` in the root of the `build` directory with
the following contents: 

```
{
    // URL for MongoDB
    "dbConnectionString": "..."
}
```

Then start the app by running `npm start`.

The app will start at `localhost:3000` if a port is not passed
as an environment variable.

The endpoints that can be called in the demo app are listed below:

### Blogs

### View Blogs
Return all blogs with optional query parameters

* Request Verb
   - `GET`

* Request URL
   - `localhost:3000/api/blog`

* Request Parameters (Query)
   - `userName`: Filter blogs by username
   - `startDate`: Filter blogs created on or after a certain date
   - `endDate`: Filter blogs created on or before a certain date
   - `skip`: Set the number of blogs to be skipped
   - `limit`: Set the number of blogs to be returned

### View Blog
Return a single blog matching the provided ID.

* Request Verb
   - `GET`

* Request URL
   - `localhost:3000/api/blog/:id`

* Request Parameters (URL)
   - `id`: The ID of the intended blog

### Create Blog
Create a new blog with the specified data

* Request Verb
   - `POST`

* Request URL
   - `localhost:3000/api/blog`

* Request Parameters (body)
   - `title`: Title of the blog
   - `content`: Content of the blog
   - `creator`: id of the creator of the blog

### Update Blog
Update a single blog matching the provided ID.

* Request Verb
   - `PATCH`

* Request URL
   - `localhost:3000/api/blog/:id`

* Request Parameters (URL)
   - `id`: The ID of the intended blog

* Request Parameters (body)
  - `title`: Title of the blog
  - `content`: Content of the blog

### Delete Blog
Delete a single blog matching the provided ID.

* Request Verb
   - `DELETE`

* Request URL
   - `localhost:3000/api/blog/:id`

* Request Parameters (URL)
   - `id`: The ID of the intended blog

## Comments

### View Comments
Return all comments that belong to a blog matching the provided blog ID.

* Request Verb
   - `GET`

* Request URL
   - `localhost:3000/api/blog/:blogId/comment`

* Request Parameters (URL)
   - `blogId`: The ID of the intended blog

### View Comment
Return a single comment matching the provided comment ID that belongs
to a blog matching the provided blog ID.

* Request Verb
   - `GET`

* Request URL
   - `localhost:3000/api/blog/:blogId/comment/:commentId`

* Request Parameters (URL)
   - `blogId`: The ID of the intended blog
   - `commentId`: The ID of the intended comment

### Create Comment
Create a new comment with the specified data and attach to the blog
matching the provided blog ID.

* Request Verb
   - `POST`

* Request URL
   - `localhost:3000/api/blog/:blogId/comment`

* Request Parameters (body)
   - `content`: Content of the comment
   - `creator`: ID of the creator of the comment

### Update Comment
Update a single comment matching the provided comment ID attached to
a blog matching the provided blog ID.

* Request Verb
   - `PATCH`

* Request URL
   - `localhost:3000/api/blog/:id/comment/:commentId`

* Request Parameters (URL)
   - `blogId`: The ID of the intended blog
   - `commentId`: The ID of the intended comment

* Request Parameters (body)
  - `content`: Content of the comment

### Delete Comment
Delete a single comment matching the provided comment ID attached to
a blog matching the provided blog ID.

* Request Verb
   - `DELETE`

* Request URL
   - `localhost:3000/api/blog/:id/comment/:commentId`

* Request Parameters (URL)
   - `blogId`: The ID of the intended blog
   - `commentId`: The ID of the intended comment
