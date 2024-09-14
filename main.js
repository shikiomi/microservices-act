const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());


const productServiceURL = 'http://localhost:3001/products';
const customerServiceURL = 'http://localhost:3002/customers';
const orderServiceURL = 'http://localhost:3003/orders';

// Customer routes
app.post('/customers', async (req, res) => {
  try {
    const response = await axios.post(`${customerServiceURL}`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${customerServiceURL}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.get('/customers/:customerId', async (req, res) => {
  try {
    const response = await axios.get(`${customerServiceURL}/${req.params.customerId}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.put('/customers/:customerId', async (req, res) => {
  try {
    const response = await axios.put(`${customerServiceURL}/${req.params.customerId}`, req.body);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.delete('/customers/:customerId', async (req, res) => {
  try {
    await axios.delete(`${customerServiceURL}/${req.params.customerId}`);
    res.status(204).send();
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});




app.listen(3000, () => {
  console.log('Gateway service running on port 3000');
});
