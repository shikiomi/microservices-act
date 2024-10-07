const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const limiter = require('../rateLimiter');
const authenticateToken = require('../auth'); 

const secretKey = 'yourSecretKey'; 
let customers = {};
let currentCustomerId = 1;

router.use(limiter);

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(customer) {
  const payload = {
    id: customer.id,
    email: customer.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingCustomer = Object.values(customers).find(
    (customer) => customer.email === email
  );

  if (existingCustomer) {
    return res.status(400).send({ error: 'Email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const id = currentCustomerId++;
  customers[id] = { id, name, email, password: hashedPassword };

  res.status(201).send({ message: 'Registration successful', id });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const customer = Object.values(customers).find(
    (customer) => customer.email === email
  );

  if (!customer) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const isValid = await comparePassword(password, customer.password);
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const token = generateToken(customer);
  res.status(200).send({ message: 'Login successful', token });
});


router.get('/', authenticateToken, (req, res) => {
  const allCustomers = Object.values(customers);
  res.status(200).send(allCustomers);
});


router.get('/:customerId', authenticateToken, (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const customer = customers[customerId];

  if (customer) {
    res.status(200).send(customer);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});


router.put('/:customerId', authenticateToken, (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const { name, email } = req.body;

  if (customers[customerId]) {
    customers[customerId] = { id: customerId, name, email };
    res.status(200).send(customers[customerId]);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});


router.delete('/:customerId', authenticateToken, (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);

  if (customers[customerId]) {
    delete customers[customerId];
    res.status(200).send(`Customer with ID ${customerId} has been deleted.`);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
});


router.delete('/', authenticateToken, (req, res) => {
  customers = {};
  currentCustomerId = 1;
  res.status(200).send('All customers have been deleted.');
});

module.exports = router;