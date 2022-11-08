import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    history:{
        type: [String]
    },
    // _id:{
        // type: String
    // },
    food:{
        type: Number
    },
    
    cars:{
        type: Number
    },
    amount:{
        type: Number
    },
    leisure:{
        type: Number
    },
    phonenumber:{
        type: Number,
    },
    password:{
        type: String,
    },
    username:{
        type: String,
    },
    photos:{
        type: String,
    },
    uuid:{
        type: Number
    },
    //stripe connect id
    stripeID:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const User = mongoose.model("users", userSchema)

export default User