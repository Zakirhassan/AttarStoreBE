Attar Store Backend (In Progress)
Features
RESTful APIs for managing products, users, and orders
User authentication using JWT (Login, Logout, Protected Routes)
Image upload and handling for product images
Full CRUD (Create, Read, Update, Delete) operations for products, users, and orders
MySQL database integration for storing and retrieving data
Node.js with Express for routing and middleware
Modular architecture with controllers and services
Middleware for request validation, authentication, and error handling
Secure password storage using bcrypt
Role-based access control (Admin/User)
🚀 What technologies were used?
Node.js - Backend runtime environment
Express.js - Web framework for building APIs
MySQL - Database for storing application data
JWT (JSON Web Token) - Authentication and authorization
Multer - Middleware for handling image uploads
bcrypt - Secure password hashing
Sequelize ORM - For database interaction (optional)
📦 How to clone and set up the project?
From your command line, follow these steps:

Clone the repository:

bash
Copy code
# Clone this repository
$ git clone https://github.com/Zakirhassan/AttarStore-Backend.git
Navigate to the project directory:

bash
Copy code
$ cd AttarStore-Backend
Install the dependencies:

bash
Copy code
$ npm install
Set up environment variables:

Create a .env file in the root of your project.
Add the following environment variables:
makefile
Copy code
PORT=5000
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attar_store
Set up the MySQL database:

Ensure you have MySQL installed and running.
Create the database:
bash
Copy code
CREATE DATABASE attar_store;
Run migrations (if using Sequelize):

bash
Copy code
$ npx sequelize-cli db:migrate
Start the development server:

bash
Copy code
$ npm start
Endpoints Overview
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
GET	/api/auth/logout	Logout a user
GET	/api/products	Get all products
POST	/api/products	Create a new product (Admin)
PUT	/api/products/:id	Update product details (Admin)
DELETE	/api/products/:id	Delete a product (Admin)
GET	/api/cart	Get items in the cart
POST	/api/cart/add	Add an item to the cart
DELETE	/api/cart/remove/:id	Remove item from cart
POST	/api/orders	Create a new order
👨‍💻 API Documentation
Detailed API documentation is available (Swagger or Postman collection link if applicable).
👨‍💻 Happy coding!
