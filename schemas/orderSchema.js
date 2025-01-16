const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    sku: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
})

const orderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    items: [itemSchema],

    shippingAmount: {
        type: Number,
        required: true,
        min: 0,
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

}
)

module.exports = mongoose.model("order", orderSchema);