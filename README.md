# E-Commerce API

An Express-based API that handles product, customer, and order management with JWT authentication, role-based access control, and rate limiting.

## Installation

```bash
npm install
npm run start:all
```

## Features

- **Product Management**: Create, read, update, and delete products.
- **Customer Management**: Register and authenticate customers.
- **Order Management**: Create, read, and delete orders.
- **Security Measures**: Implements JWT authentication, role-based access control, and rate limiting.

## API Endpoints

- `http://localhost:3000` - Main endpoint for everything
- `http://localhost:3001` - Products service
- `http://localhost:3002` - Customer service
- `http://localhost:3003` - Orders service

---

### Products

- **Create Product**  
  `POST /products`  
  _Required Role: admin_

  ```json
  {
    "name": "Product 1",
    "price": 100,
    "description": "Description of Product 1",
    "category": "Category 1"
  }
  ```

- **Get All Products**  
  `GET /products`  
  _Required Roles: admin, customer_

- **Get Product by ID**  
  `GET /products/:productId`  
  _Required Roles: admin, customer_

- **Update Product**  
  `PUT /products/:productId`  
  _Required Role: admin_

- **Delete Product**  
  `DELETE /products/:productId`  
  _Required Role: admin_

- **Delete All Products**  
  `DELETE /products`  
  _Required Role: admin_

---

### Customers

- **Register Customer**  
  `POST /customers/register`

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "customer"
  }
  ```

- **Login Customer**  
  `POST /customers/login`

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Get All Customers**  
  `GET /customers`  
  _Required Role: admin_

- **Get Customer by ID**  
  `GET /customers/:customerId`  
  _Required Roles: admin, customer_

- **Update Customer**  
  `PUT /customers/:customerId`  
  _Required Role: admin_

- **Delete Customer**  
  `DELETE /customers/:customerId`  
  _Required Role: admin_

- **Delete All Customers**  
  `DELETE /customers`  
  _Required Role: admin_

---

### Orders

- **Create Order**  
  `POST /orders`  
  _Required Role: customer_

  ```json
  {
    "customerId": 1,
    "productId": 1,
    "quantity": 2
  }
  ```

- **Get All Orders**  
  `GET /orders`  
  _Required Role: admin_

- **Get Order by ID**  
  `GET /orders/:orderId`  
  _Required Roles: admin, customer_

- **Update Order**  
  `PUT /orders/:orderId`  
  _Required Role: admin_

- **Delete Order**  
  `DELETE /orders/:orderId`  
  _Required Role: admin_

- **Delete All Orders**  
  `DELETE /orders`  
  _Required Role: admin_

---

## Security

This API uses the following security measures:

- **JWT Authentication**: Ensures secure access to routes.
- **Role-Based Access Control**: Restricts access based on user roles.
- **Rate Limiting**: Prevents abuse by limiting requests.

## Contributing

Contributions are welcome! Please open an issue or create a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
