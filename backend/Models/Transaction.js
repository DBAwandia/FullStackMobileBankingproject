import mongoose from "mongoose";

const transactSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 2000
    },
    history: {
        type:[ String]
    }
    ,
    uuid: {
        type: String
    },
    paymentReason:{
        type: [String]
    }
},{timestamps: true})

const Transaction = mongoose.model("accountBalances", transactSchema)

export default Transaction