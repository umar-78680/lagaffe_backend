const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const costingSchema = new Schema({
  cost: { type: Number, required: true },
  import: { type: Number, required: true },
  shoot: { type: Number, required: true },
  packaging: { type: Number, required: true },
  misc: { type: Number, required: true },
  gst: { type: Number, required: true },
  stocking: { type: Number, required: true },
})

const productSchema = new Schema({
  sku: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  costing: costingSchema,
})

module.exports = mongoose.model("product", productSchema);