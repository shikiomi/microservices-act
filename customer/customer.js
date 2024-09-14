const express = require('express');
const router = express.Router();

let customers = {};
let currentCustomerId = 1; 


router.post('/', (req, res) => {
  const { name, email } = req.body;

  const id = currentCustomerId++;
  
  customers[id] = { id, name, email };
  
  res.status(201).send(customers[id]);
});


router.get('/', (req, res) => {
  const allCustomers = Object.values(customers); 
  res.status(200).send(allCustomers);
});


router.get('/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const customer = customers[customerId];
  
  if (customer) {
    res.status(200).send(customer);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});


router.put('/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const { name, email } = req.body;

  if (customers[customerId]) {
    customers[customerId] = { id: customerId, name, email };
    res.status(200).send(customers[customerId]);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});


router.delete('/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);

  if (customers[customerId]) {
    delete customers[customerId];
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});

module.exports = router;
