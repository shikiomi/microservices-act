const express = require('express');
const app = express();
app.use(express.json());

const productRoutes = require('./product');
app.use('/products', productRoutes);

app.listen(3001, () => {
  console.log('Product Service running on port 3001');
});