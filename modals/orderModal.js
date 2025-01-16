const orderSchema = require("../schemas/orderSchema")


const addOrder = (orderId, customerName, items, shippingAmount, totalAmount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const obj = new orderSchema({
        orderId,
        customerName,
        items,
        shippingAmount,
        totalAmount,
      })

      const db = await obj.save();

      resolve(db);
    } catch (error) {
      reject(error);
    }
  })
}

const findOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await orderSchema.findOne({ orderId });

      resolve(db);
    } catch (error) {
      reject(error);
    }
  })
}

const editOrder = (orderId, customerName, items, shippingAmount, totalAmount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await orderSchema.findOneAndUpdate(
        { orderId },
        { $set: { orderId, customerName, items, shippingAmount, totalAmount } },
        { new: true, runValidators: true }
      )
      resolve(db);
    } catch (error) {
      reject(error);
    }
  })
}

const deleteOrder = (orderId) =>
{
  return new Promise(async (resolve, reject) => {
    try {
      const db = await orderSchema.findOneAndDelete({ orderId })
      resolve(db);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = { addOrder, editOrder, findOrder, deleteOrder };