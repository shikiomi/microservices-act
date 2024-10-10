const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const limiter = require('../rateLimiter');
const { authenticateToken, authorizeRoles } = require('../auth'); 

const secretKey = process.env.SECRET_KEY || 'yourSecretKey'; 
let products = {}; 
let currentProductId = 1;

router.use(limiter);


router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const { name, price, description, category } = req.body;

  const id = currentProductId++;
  products[id] = { id, name, price, description, category };

  res.status(201).send({ message: 'Product created successfully', id });
});


router.get('/', authenticateToken, (req, res) => {
  const allProducts = Object.values(products);
  res.status(200).send(allProducts);
});


router.get('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const product = products[productId];

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});


router.put('/:productId', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const { name, price, description, category } = req.body;

  if (products[productId]) {
    products[productId] = { id: productId, name, price, description, category };
    res.status(200).send(products[productId]);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});


router.delete('/:productId', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const productId = parseInt(req.params.productId, 10);

  if (products[productId]) {
    delete products[productId];
    res.status(200).send(`Product with ID ${productId} has been deleted.`);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});


router.delete('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  products = {};
  currentProductId = 1;
  res.status(200).send('All products have been deleted.');
});

module.exports = router;