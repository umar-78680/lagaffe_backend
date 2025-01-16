const express = require("express");

const productRouter = express.Router();


const {productAddController, productDetailsController, editProductDetailsController} = require("../controllers/productController");

productRouter.post("/add-product", productAddController);
productRouter.post("/product-details", productDetailsController);
productRouter.post("/edit-product", editProductDetailsController);


module.exports = productRouter;
