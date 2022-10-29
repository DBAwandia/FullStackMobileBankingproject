import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    history:{
        type: [String]
    },
    food:{
        type: Number
    },
    
    cars:{
        type: Number
    },
    // carPlans:{
    //     type: String
    // },
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
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const User = mongoose.model("users", userSchema)

export default User