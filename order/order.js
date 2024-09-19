const express = require('express');
const axios = require('axios');
const router = express.Router();


let orders = {};
let currentOrderId = 1;


const productServiceURL = 'http://localhost:3001/products';
const customerServiceURL = 'http://localhost:3002/customers';


router.post('/', async (req, res) => {
  const { productId, customerId, quantity } = req.body;

  try {
  
    const customerResponse = await axios.get(`${customerServiceURL}/${customerId}`);
    const customer = customerResponse.data;

   
    const productResponse = await axios.get(`${productServiceURL}/${productId}`);
    const product = productResponse.data;

 
    const totalPrice = product.price * quantity;
    const orderId = currentOrderId++;
    orders[orderId] = {
      orderId,
      customer: {
        id: customer.id,
        name: customer.name
      },
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      },
      totalPrice
    };

    
    res.status(201).send({
      orderId,
      customer: {
        name: customer.name
      },
      product: {
        name: product.name,
        quantity
      },
      totalPrice
    });

  } catch (error) {
    
    res.status(400).send({ error: 'Invalid customer or product' });
  }
});


router.get('/:orderId', (req, res) => {
  const order = orders[req.params.orderId];
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404).send({ error: 'Order not found' });
  }
});


router.get('/', (req, res) => {
  if (Object.keys(orders).length === 0) {
    return res.status(404).send({ error: 'No orders found' });
  }
  res.status(200).send(Object.values(orders));
});


router.delete('/:orderId', (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);

  if (orders[orderId]) {
    delete orders[orderId];
    res.status(200).send(`Order with ID ${orderId} has been deleted.`);
  } else {
    res.status(404).send({ error: 'Order not found' });
  }
});

router.delete('/', (req, res) => {
  orders = {}; // Clear all orders
  currentOrderId = 1; // Reset order ID counter
  res.status(200).send('All orders have been deleted.');
});

module.exports = router;
