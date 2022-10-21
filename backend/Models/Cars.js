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
    }
},{timestamps: true})

const Cars = mongoose.model("cars", carsSchema)

export default Cars