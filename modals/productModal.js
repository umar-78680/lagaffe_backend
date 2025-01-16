const productSchema = require("../schemas/productSchema");

const addProduct = (sku, stock, costing) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = new productSchema({
                sku,
                stock,
                costing,
            })

            const productDb = await obj.save();
            resolve(productDb);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const findProductDetails = (sku) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productDb = await productSchema.findOne({sku});
            resolve(productDb);
        } catch (error) {
            reject(error);
        }
    })
}

const editProductDetails = (sku, stock, costing) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productDb = await productSchema.findOneAndUpdate(
                { sku },
                { $set: { stock, costing } }, 
                { new: true, runValidators: true } 
              );
              resolve(productDb);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {addProduct, findProductDetails, editProductDetails};