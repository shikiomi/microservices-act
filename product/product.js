const express = require('express');
const router = express.Router();

let products = {};
let currentProductId = 1; 

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const id = currentProductId++;
  products[id] = { id, name, price };
  res.status(201).send(products[id]);
});

router.get('/', (req, res) => {
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

router.delete('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);

  if (products[productId]) {
    delete products[productId];
    res.status(200).send(`Product with ID ${productId} has been deleted.`);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});

router.delete('/', (req, res) => {
  products = {};
  currentProductId = 1; 
  res.status(200).send('All products have been deleted.');
});

module.exports = router;