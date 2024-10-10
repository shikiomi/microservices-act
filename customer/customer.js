const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const limiter = require('../rateLimiter');
const { authenticateToken, authorizeRoles } = require('../auth');

const secretKey = process.env.SECRET_KEY || 'yourSecretKey'; 
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
    role: customer.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}


router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingCustomer = Object.values(customers).find(
    (customer) => customer.email === email
  );

  if (existingCustomer) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  if (!['admin', 'customer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be either admin or customer.' });
  }

  const hashedPassword = await hashPassword(password);
  const id = currentCustomerId++;
  customers[id] = { id, name, email, password: hashedPassword, role };

  res.status(201).json({ message: 'Registration successful', id });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const customer = Object.values(customers).find(
    (customer) => customer.email === email
  );

  if (!customer) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isValid = await comparePassword(password, customer.password);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(customer);
  res.status(200).json({ message: 'Login successful', token });
});


router.get('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const allCustomers = Object.values(customers);
  res.status(200).json(allCustomers);
});


router.get('/:customerId', authenticateToken, authorizeRoles('admin', 'customer'), (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const customer = customers[customerId];

  if (customer) {

    if (req.user.role === 'customer' && req.user.id !== customerId) {
      return res.status(403).json({ error: 'Access denied to other customers\' data' });
    }
    return res.status(200).json(customer);
  } else {
    return res.status(404).json({ error: 'Customer not found' });
  }
});


router.put('/:customerId', authenticateToken, authorizeRoles('admin', 'customer'), (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const { name, email } = req.body;

  if (customers[customerId]) {
    
    if (req.user.role === 'customer' && req.user.id !== customerId) {
      return res.status(403).json({ error: 'Access denied to update other customers\' data' });
    }
    customers[customerId] = { ...customers[customerId], name, email };
    return res.status(200).json(customers[customerId]);
  } else {
    return res.status(404).json({ error: 'Customer not found' });
  }
});


router.delete('/:customerId', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);

  if (customers[customerId]) {
    delete customers[customerId];
    return res.status(200).json(`Customer with ID ${customerId} has been deleted.`);
  } else {
    return res.status(404).json({ error: 'Customer not found' });
  }
});


router.delete('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  customers = {};
  currentCustomerId = 1;
  return res.status(200).json('All customers have been deleted.');
});

module.exports = router;