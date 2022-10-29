import mongoose from "mongoose"

const carsSchema = new mongoose.Schema({
    uuid: {
        type: Number
    },
    balance:{
        type: Number,
        default: 100
    },
    amount:{
        type: Number
    },
    theCaridx:{
        type: String
    }
},{timestamps: true})

const Cars = mongoose.model("cars", carsSchema)

export default Cars