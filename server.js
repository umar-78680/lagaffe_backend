const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config();


//file import
const db = require("./db");
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const abnormalLossrouter = require('./routers/abnormalLossRouter');
const expenseRouter = require('./routers/expenseRouter');


//middleware
app.use(cors());
app.use(express.json());
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/abnormalLoss", abnormalLossrouter);
app.use("/expense", expenseRouter);


app.get("/", (req,res) => {
  return res.send("hi world!");
})

app.listen(8000, () => {
  console.log("Server is up and running");
})
