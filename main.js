const express = require('express');
const axios = require('axios');
const cors = require('cors');
const limiter = require('./rateLimiter'); // Ensure this path is correct
const authenticateJWT = require('./auth'); // Import JWT authentication middleware

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS if needed
app.use(limiter); // Rate limiting middleware

// Base URLs for services
const productServiceURL = 'http://localhost:3001/products';
const customerServiceURL = 'http://localhost:3002/customers';
const orderServiceURL = 'http://localhost:3003/orders';

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling function
const handleError = (error, res) => {
  console.error(error);
  res.status(error.response?.status || 500).send({
    error: error.response?.data || 'An error occurred',
  });
};

// Product routes
app.post('/products', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.post(productServiceURL, req.body, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/products/:productId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${productServiceURL}/${req.params.productId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/products', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(productServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/products/:productId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${productServiceURL}/${req.params.productId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/products', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(productServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Customer routes
app.post('/customers/register', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}/register`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Customer login route
app.post('/customers/login', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}/login`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/customers/:customerId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${customerServiceURL}/${req.params.customerId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/customers', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(customerServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/customers/:customerId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${customerServiceURL}/${req.params.customerId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/customers', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(customerServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Order routes
app.post('/orders', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.post(orderServiceURL, req.body, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(201).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/orders/:orderId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(`${orderServiceURL}/${req.params.orderId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/orders', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.get(orderServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/orders/:orderId', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(`${orderServiceURL}/${req.params.orderId}`, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

app.delete('/orders', authenticateJWT, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await axios.delete(orderServiceURL, {
      headers: {
        Authorization: authorization,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Start the main gateway server
app.listen(3000, () => {
  console.log('Gateway service running on port 3000');
});
