const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dateReported: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model("expense", expensesSchema);