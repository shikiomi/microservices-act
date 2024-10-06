const express = require('express');
const app = express();
app.use(express.json());

const customerRoutes = require('./customer');
app.use('/customers', customerRoutes);

app.listen(3002, () => {
  console.log('Customer Service running on port 3002');
});