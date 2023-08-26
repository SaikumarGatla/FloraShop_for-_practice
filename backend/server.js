const express = require('express')
const app = express();
const path = require('path')
const mongoose =require('mongoose');
// const morgan =require('morgan');
const cors = require("cors");
const port = 5000

// import Routes
const productRoutes =require('./routes/productRoutes.js');
const userRoutes =require('./routes/userRoutes.js');
const orderRoutes =require('./routes/orderRoutes.js');
const uploadRoutes =require('./routes/uploadRoutes.js');

app.use(express.json())
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/florashop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

//mounting common path 
app.use('/api/products', productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send("ARgoGtzHMb7Ai6wmMQyEsHVxr5NxdMN_r9KZlcofu1Qjl-GhJtoXnzYryei7MQN-COEh5GmT3zc7irPV");
});

// const Stripe_Api_key = 'sk_test_51LpjDySIuYbTNQyJ7rCw6Q3hd5cqFZ6ZrQ9MB6H4rNvzqJrfHpTx4G9uWK1U7kqpVS1aPbo6kgkW6YhnBzQicpqP00kOovsElz';
// const stripe = require('stripe')(Stripe_Api_key);

var __dirname = path.resolve();
console.log(__dirname)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


//server connecting...
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})