const express = require('express');
const axios = require('axios');
const cors = require('cors');
const limiter = require('./rateLimiter'); 
const { authenticateToken, authorizeRoles } = require('./auth'); 

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(limiter); 

const productServiceURL = 'http://localhost:3001/products';
const customerServiceURL = 'http://localhost:3002/customers';
const orderServiceURL = 'http://localhost:3003/orders';

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const handleError = (error, res) => {
  console.error(error);
  res.status(error.response?.status || 500).send({
    error: error.response?.data || 'An error occurred',
  });
};

// Product Routes
app.post('/products', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.post(productServiceURL, req.body, {
      headers: { Authorization: authorization },
    });
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/products/:productId', authenticateToken, authorizeRoles('admin', 'customer'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${productServiceURL}/${req.params.productId}`, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/products', authenticateToken, authorizeRoles('admin', 'customer'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(productServiceURL, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.put('/products/:productId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.put(`${productServiceURL}/${req.params.productId}`, req.body, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/products/:productId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${productServiceURL}/${req.params.productId}`, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/products', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(productServiceURL, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Customer Routes
app.post('/customers/register', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}/register`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.post('/customers/login', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}/login`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/customers/:customerId', authenticateToken, authorizeRoles('admin', 'customer'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${customerServiceURL}/${req.params.customerId}`, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/customers', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(customerServiceURL, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.put('/customers/:customerId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.put(`${customerServiceURL}/${req.params.customerId}`, req.body, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/customers/:customerId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${customerServiceURL}/${req.params.customerId}`, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/customers', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(customerServiceURL, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Order Routes
app.post('/orders', authenticateToken, authorizeRoles('customer'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.post(orderServiceURL, req.body, {
      headers: { Authorization: authorization },
    });
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/orders/:orderId', authenticateToken, authorizeRoles('admin', 'customer'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${orderServiceURL}/${req.params.orderId}`, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/orders', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(orderServiceURL, {
      headers: { Authorization: authorization },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.put('/orders/:orderId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.put(`${orderServiceURL}/${req.params.orderId}`, req.body, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/orders/:orderId', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${orderServiceURL}/${req.params.orderId}`, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/orders', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(orderServiceURL, {
      headers: { Authorization: authorization },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.listen(3000, () => {
  console.log('Gateway service running on port 3000');
});