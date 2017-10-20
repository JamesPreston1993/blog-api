# Blog API

An API for creating, viewing, editing and deleting blogs using:

* Express
* Mongoose
* MongoDB

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

### View Blogs
Return all blogs with optional query parameters

#### Request
`GET localhost:3000/api/blog`

Query Parameters:
* `userName`: Filter blogs by username
* `startDate`: Filter blogs created on or after a certain date
* `endDate`: Filter blogs created on or before a certain date
* `limit`: Set the number of blogs to be returned

### View Blog
Return a single blog matching the provided ID.

#### Request
`GET localhost:3000/api/blog/:id`

Request Parameters (URL):
* `id`: The ID of the intended blog

### Create Blog
Create a new blog with the specified data

#### Request
`POST localhost:3000/api/blog`

Request Parameters (body):
* `title`: Title of the blog
* `content`: Content of the blog
* `creator`: id of the creator of the blog

### Update Blog
Update a single blog matching the provided ID.

#### Request
`PATCH localhost:3000/api/blog/:id`

Request Parameters (URL):
* `id`: The ID of the intended blog

Request Parameters (body):
* `title`: Title of the blog
* `content`: Content of the blog

### Delete Blog
Delete a single blog matching the provided ID.

#### Request
`DELETE localhost:3000/api/blog/:id`

Request Parameters (URL):
* `id`: The ID of the intended blog