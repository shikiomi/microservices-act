const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const orderRoutes = require('./order');
app.use('/orders', orderRoutes);

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});
