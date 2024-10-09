const express = require('express');
const orderRoutes = require('./order'); 
const app = express();
const port = 3003;


app.use(express.json());


app.use('/orders', orderRoutes);


app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start the server:', err);
  } else {
    console.log(`Order service is running on port ${port}`);
  }
});