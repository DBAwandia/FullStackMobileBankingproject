import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    history:{
        type: [String]
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