const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const abnormalLossSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    issueType: {
        type: String,
        required: true,
        enum: ['return', 'weight_discrepancy'],
    },
    weightDiscrepancy: {
        type: Number,
        default: null
    },
    returnDetails: {
        type: Number,
        default: null,
    },
    dateReported: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model("abnormalLoss", abnormalLossSchema);

