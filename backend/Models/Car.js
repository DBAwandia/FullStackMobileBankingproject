import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    type:{
        type: String
    },
    price: {
        type:Number
    },
    photos:{
        type: String
    }
})

const Car = mongoose.model("caracccreateds",carSchema)

export default Car