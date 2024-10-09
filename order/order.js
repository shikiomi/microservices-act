const express = require('express');
const axios = require('axios'); 
const authenticateToken = require('../auth');
const limiter = require('../rateLimiter'); 

const router = express.Router();
const secretKey = 'yourSecretKey'; 


const customerServiceURL = 'http://localhost:3002/customers';
const productServiceURL = 'http://localhost:3001/products';

let orders = {}; 
let currentOrderId = 1;


router.use(limiter);


router.post('/', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;

 
    if (!productId || !quantity) {
        return res.status(400).send({ error: 'Product ID and Quantity are required' });
    }

    const customerId = req.user.id; 

    try {
        
        await axios.get(`${customerServiceURL}/${customerId}`);

        
        const productResponse = await axios.get(`${productServiceURL}/${productId}`);
        const productPrice = productResponse.data.price; 
        const totalPrice = productPrice * quantity;

      
        const id = currentOrderId++;
        orders[id] = { id, customerId, productId, quantity, totalPrice };
        res.status(201).send({ message: 'Order created successfully', id });
    } catch (error) {
        console.error('Error in creating order:', error.message);
        if (error.response) {
            return res.status(error.response.status).send({ error: error.response.data.message });
        }
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});


router.get('/', authenticateToken, (req, res) => {
    const allOrders = Object.values(orders);
    res.status(200).send(allOrders);
});


router.get('/:orderId', authenticateToken, (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);
    const order = orders[orderId];

    if (order) {
        res.status(200).send(order);
    } else {
        res.status(404).send({ error: 'Order not found' });
    }
});


router.put('/:orderId', authenticateToken, async (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);
    const { productId, quantity } = req.body;

    if (orders[orderId]) {
        try {
            
            const productResponse = await axios.get(`${productServiceURL}/${productId}`);
            const productPrice = productResponse.data.price; 

            const totalPrice = productPrice * quantity;
            orders[orderId] = { id: orderId, customerId: req.user.id, productId, quantity, totalPrice };
            res.status(200).send(orders[orderId]);
        } catch (error) {
            console.error('Error in updating order:', error.message);
            if (error.response) {
                return res.status(error.response.status).send({ error: error.response.data.message });
            }
            res.status(500).send({ error: 'An unexpected error occurred' });
        }
    } else {
        res.status(404).send({ error: 'Order not found' });
    }
});


router.delete('/:orderId', authenticateToken, (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);

    if (orders[orderId]) {
        delete orders[orderId];
        res.status(200).send(`Order with ID ${orderId} has been deleted.`);
    } else {
        res.status(404).send({ error: 'Order not found' });
    }
});


router.delete('/', authenticateToken, (req, res) => {
    orders = {};
    currentOrderId = 1;
    res.status(200).send('All orders have been deleted.');
});

module.exports = router;