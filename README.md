npm install

npm run start:all

Products
GET /products - Get all products.

POST /products - Create a new product.

GET /products/:productId - Get a product by ID.

DELETE /products/:productId - Delete a product by ID.

DELETE /products - Delete all products.



{
  "name": "Laptop",
  "price": 1200,
  "category": "Electronics"
}



Customers
GET /customers - Get all customers.

POST /customers - Create a new customer.

GET /customers/:customerId - Get a customer by ID.

DELETE /customers/:customerId - Delete a customer by ID.

DELETE /customers - Delete all customers.


{
  "name": "John Doe",
  "email": "johndoe@example.com"
}


Orders
GET /orders - Get all orders.

POST /orders - Place a new order.

GET /orders/:orderId - Get an order by ID.

DELETE /orders/:orderId - Delete an order by ID.

DELETE /orders - Delete all orders.

{
  "productId": 1,
  "customerId": 1,
  "quantity": 2
}


