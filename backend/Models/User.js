import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const User = mongoose.model("users", userSchema)

export default User