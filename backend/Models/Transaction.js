import mongoose from "mongoose";

const transactSchema = new mongoose.Schema({
    balance: {
        type: String,
        default: 0
    },
    history: {
        type:[ String]
    }
    ,
    uuid: {
        type: String
    }
},{timestamps: true})

const Transaction = mongoose.model("accountBalances", transactSchema)

export default Transaction