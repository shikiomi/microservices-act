const express = require('express');
const router = express.Router();

// In-memory database for products
let products = {};
let currentProductId = 1; // Start product ID at 1

// Create a new product
router.post('/', (req, res) => {
  const { name, price } = req.body;

  // Assign an incremental ID
  const id = currentProductId++;
  
  // Create a new product object and store it
  products[id] = { id, name, price };
  
  // Send the newly created product in the response
  res.status(201).send(products[id]);
});

// Get all products
router.get('/', (req, res) => {
  const allProducts = Object.values(products); // Convert products object to an array
  res.status(200).send(allProducts);
});

// Get product by ID
router.get('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const product = products[productId];
  
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});

// Update product
router.put('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const { name, price } = req.body;

  if (products[productId]) {
    products[productId] = { id: productId, name, price };
    res.status(200).send(products[productId]);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});

// Delete product
router.delete('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);

  if (products[productId]) {
    delete products[productId];
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});

module.exports = router;