# Dzmitry Luzko (Dzmitry(@vilkasts)) repo

## Task 4: CRUD API

# User Management API

This is a Node.js-based REST API for managing users. The application allows you to create, retrieve, update, and delete users through a series of HTTP methods.

## Features

- **GET** all users
- **GET** user by ID
- **POST** create a new user
- **PUT** update user information
- **DELETE** remove a user
- Built-in **data validation** for user inputs

## Installation

1. Clone the repository.

2. Install dependencies:

`npm install`

## Usage

### Start the server in development mode:

`npm run start:dev`

This will start the server on `http://localhost:4000/`.

### Start the server in production mode:

`npm run start:prod`

This will build the code and run the server from the `dist` directory.

### Available Scripts

- `npm run build`: Transpile the TypeScript code to JavaScript.
- `npm run format`: Format the source files using Prettier.
- `npm run lint`: Lint and automatically fix code using ESLint.
- `npm run start:dev`: Start the server in development mode with hot-reloading (nodemon).
- `npm run start:prod`: Build and start the server in production mode.
- `npm run test`: Run the unit tests silently.
- `npm run test:verbose`: Run the unit tests with verbose output.

## Endpoints

### Base URL
`http://localhost:4000/api/users`

### Endpoints:

#### 1. Get All Users

- **Method**: `GET`
- **Endpoint**: `/api/users`
- **Description**: Retrieves a list of all users.
- **Response**: Returns an array of users in JSON format.

#### 2. Get User By ID

- **Method**: `GET`
- **Endpoint**: `/api/users/:id`
- **Description**: Retrieves a single user by their ID.
- **Parameters**: `:id` - The unique user ID (UUID format).
- **Response**: Returns the user's details or a 404 error if the user is not found.

#### 3. Create a New User

- **Method**: `POST`
- **Endpoint**: `/api/users`
- **Description**: Creates a new user.
- **Body**:
  ```json
  {
    "username": "string",
    "age": number,
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the newly created user or a 400 error for validation issues.

#### 4. Update an Existing User

- **Method**: `PUT`
- **Endpoint**: `/api/users/:id`
- **Description**: Updates an existing user’s details.
- **Parameters**: `:id` - The unique user ID (UUID format).
- **Body**:
  ```json
  {
    "username": "string",
    "age": number,
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the updated user or a 404 error if the user is not found.

#### 5. Delete a User

- **Method**: `DELETE`
- **Endpoint**: `/api/users/:id`
- **Description**: Deletes a user by their ID.
- **Parameters**: `:id` - The unique user ID (UUID format).
- **Response**: A 204 No Content status for successful deletion or a 404 error if the user is not found.

## Testing

To run the tests, use the following command:

`npm run test`

For verbose test output:

`npm run test:verbose`