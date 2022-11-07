import mongoose from "mongoose"

const histSchema = new mongoose.Schema({
    name:{
        type: String
    },
    senderNumber:{
        type: Number
    },
    email:{
        type: String
    },
    receiverNumber:{
        type: Number
    },
    receiverName:{
        type: String
    },
    transactNumber:{
        type: Number
    },
    amount:{
        type: Number
    },
    uuid:{
        type: Number
    },
    type:{
        type: String
    }

},{timestamps: true})

const HistoryData = mongoose.model("historys", histSchema)

export default HistoryData