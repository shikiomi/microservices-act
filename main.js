const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const productServiceURL = 'http://localhost:3001/products';
const customerServiceURL = 'http://localhost:3002/customers';
const orderServiceURL = 'http://localhost:3003/orders';

app.post('/products', async (req, res) => {
  try {
    const response = await axios.post(`${productServiceURL}`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${productServiceURL}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.get('/products/:productId', async (req, res) => {
  try {
    const response = await axios.get(`${productServiceURL}/${req.params.productId}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.put('/products/:productId', async (req, res) => {
  try {
    const response = await axios.put(`${productServiceURL}/${req.params.productId}`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.delete('/products/:productId', async (req, res) => {
  try {
    await axios.delete(`${productServiceURL}/${req.params.productId}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.post('/customers', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${customerServiceURL}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.get('/customers/:customerId', async (req, res) => {
  try {
    const response = await axios.get(`${customerServiceURL}/${req.params.customerId}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.put('/customers/:customerId', async (req, res) => {
  try {
    const response = await axios.put(`${customerServiceURL}/${req.params.customerId}`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.delete('/customers/:customerId', async (req, res) => {
  try {
    await axios.delete(`${customerServiceURL}/${req.params.customerId}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Gateway service running on port 3000');
});