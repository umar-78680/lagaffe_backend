const express =require("express");
const {addOrderController, editOrderController, findOrderController, deleteOrderController} = require("../controllers/orderController");

const orderRouter = express.Router();


orderRouter.post("/add-order", addOrderController);
orderRouter.post("/edit-order", editOrderController);
orderRouter.post("/find-order", findOrderController);
orderRouter.post("/delete-order", deleteOrderController);

module.exports = orderRouter;