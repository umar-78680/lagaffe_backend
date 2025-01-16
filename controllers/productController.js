const {addProduct, findProductDetails, editProductDetails} = require("../modals/productModal");


async function productAddController (req, res) {
  const {sku, stock, costing} = req.body
    try {
      const productDb = await addProduct(sku, stock, costing);
      return res.send({
        status: 201,
        success: true,
        message: "Product Add successfully",
        data: productDb,
      })
    } catch (error) {
      return res.send({
        status: 500,
        success: false,
        message: "Internal Server Error",
        data: error,
      })
    }
  }

  async function productDetailsController(req,res) {
    const sku = req.body.sku;
    
    try {
      const productDb = await findProductDetails(sku);
      if(!productDb)
      {
        return res.send({
          status: 404,
          success: false,
          message: "Product Not Found", 
        })
      }
      return res.send({
        status: 200,
        success: true,
        message: "Read Success",
        data: productDb,
      });
    } catch (error) {
      return res.send({
        status: 500,
        success: false,
        message: "Internal Server Error",
        data: error,
      })
    }
  }

  async function editProductDetailsController(req, res) {
     const {sku, stock, costing} = req.body;

     try {
      const productDb = await findProductDetails(sku);
      if(!productDb)
      {
        return res.send({
          status: 404,
          success: false,
          message: "Product Not Found", 
        })
      }
      
      const db = await editProductDetails(sku, stock, costing);

      return res.send({
        status: 200,
        success: true,
        message: "Edit successfull",
        data: db,
      })
    } catch (error) {
      return res.send({
        status: 500,
        success: false,
        message: "Internal Server Error",
        data: error,
      })
    }
  }

  module.exports = {productAddController, productDetailsController, editProductDetailsController};