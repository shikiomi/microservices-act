const express = require('express');
const productRoutes = require('./product');
const app = express();
const port = 3001;

app.use(express.json());

app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Product service is running on port ${port}`);
});