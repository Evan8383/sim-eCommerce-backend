# Project Name

This project is a Node.js application using Express.js for routing and Sequelize as an ORM for data modeling. It's a backend service that provides a RESTful API for managing categories, products, and tags in a MySQL database.

The application's structure is as follows:

- `config/`: Contains the configuration for the database connection.
- `db/`: Contains the SQL schema for the database.
- `models/`: Contains Sequelize models for `Category`, `Product`, `ProductTag`, and `Tag`.
- `routes/`: Contains the Express routes for the API. There are separate route files for categories, products, and tags.
- `seeds/`: Contains seed data for the database.
- `server.js`: The entry point for the application.

The application uses environment variables for sensitive information like database credentials. These are not included in the repository and should be added to a `.env` file in the root of the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [Routes](#routes)
- [Server Configuration](#server-configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/Evan8383/sim-eCommerce-backend`
2. Navigate to the project's root directory: `cd sim-eCommerce-backend`
3. Install dependencies: `npm install`
4. Set up the database: `source db/schema.sql`
5. Create a `.env` file in the root directory and set the necessary environment variables (refer to the [Environment Variables](#environment-variables) section).
6. Create a `config/connection.js` file with the provided code for establishing the database connection.
7. Create a `server.js` file with the provided code for configuring the server.
8. Run the application: `npm start`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
# Example .env file
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
```

## Dependencies
The project uses the following dependencies:
```
dotenv
express
mysql2
sequelize
```
To install these dependencies, run:
```bash
npm install
```

## Usage
Describe how to use the application and any additional setup needed.

## Models
The project uses Sequelize as an ORM to interact with the database. Here's an overview of the models used in the project:
```
Category Model
Product Model
ProductTag Model
Tag Model
```

## Summary of Routes
Categories Routes: Handles CRUD operations for categories.
Products Routes: Manages CRUD operations for products, including associations with categories and tags.
Tags Routes: Allows CRUD operations for tags, with the ability to associate tags with products.

###### Please refer to the individual route files (category-routes.js, product-routes.js, tag-routes.js) for detailed implementations of each route.

## Server Configuration (server.js)
Create a server.js file with the following code to configure the server:

## License
This project is licensed under the terms of the [LICENSE](LICENSE) file.