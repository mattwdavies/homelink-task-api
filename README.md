# HomeLink Task

## Overview

This is an app that provides a RESTful API allowing users to manage devices within a HomeLink style system. It contains endpoints to register new devices, retrieve device information, update device statuses, and delete devices.

I have containerised the app using Docker for ease-of-setup. In reality this could be easily connected to AWS RDS (for example) with environment variables in the knexfile.ts

## Technologies Used

- Node.js
- TypeScript
- Express
- PostgreSQL
- Knex.js: SQL query builder for Node.js, used for migrations and database interactions.
- Yup: Value parsing and validation.
- Docker: Containerisation the app so it can be spun up on any platform.

## Spinnning up the app

### Prerequisites

To run this application, you need to have the following installed on your local machine:

- Node.js
- Docker
- Docker Compose

### Running the Application with Docker

1. **Install NPM Dependencies**

   In the root directory run

   `npm install`

2. **Build and Run the Docker Containers**

   Use Docker Compose to build and run the containers:

   `docker-compose up --build`

   This command will start both the application and PostgreSQL database in separate containers.

3. **Migrate and Seed the Database**

   Open a new terminal window and run the following command to create the database schema and seed it with initial data:

   `docker-compose exec app npm run migrate`

   `docker-compose exec app npm run seed`

4. **Testing**

   To run your test suite, you must have you docker container running:
   (it would be nice in future to not have to run against a containerised app for testing purposes)

   `docker-compose exec app npm test`

4. **Access the API**

   The API will be available at <http://localhost:3000>.

## Development Commands

You do not need Docker to run these commands; they can be executed directly in your terminal.

### Linting

To check your code for errors and enforce coding standards, run:

`npm run lint`

### Formatting

To format your code using Prettier, run:

`npm run format`

### Building

To compile your TypeScript files to JavaScript, run:

`npm run build`

## Environment Variables

Create a .env file in the root of project with the following variables:

```DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mydb
```

## API Endpoints

### Register a Device

- **Endpoint**: POST /devices
- **Body**:

```
{
  "name": "123",
  "type": "light",
  "status": true,
  "model": "true"
}
```

### List All Devices

- **Endpoint**: GET /devices

### Get Device Details

- **Endpoint**: GET /devices/:id

### Update Device Status

- **Endpoint**: PUT /devices/:id
- **Body**: JSON object with updated device details.

### Delete a Device

- **Endpoint**: DELETE /devices/:id
