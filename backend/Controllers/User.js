// import User from "../Models/User.js"
import users from "../Models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken";

//register
export const registerUser = async( req,res)=>{
    // const username = req.body.username
    // const phonenumber = req.body.phonenumber
    const password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
    const savedUser = users({...req.body,password: password})
    try{
        const oldUser = await users.findOne({ phonenumber: req.body.phonenumber})
        if(oldUser){
            res.status(400).json("Already exists")
        }else{
            const user = await savedUser.save()
            res.status(200).json(user)
        }

    }catch(err){
        res.status(500).json(err)
    }

}
//login
export const loginUser = async (req,res)=>{
    try{
        const user = await users.findOne({phonenumber: req.body.phonenumber})
           !user && res.status(400).json("please register")
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            originalPassword !== req.body.password && res.status(400).json("Put correct password")
        
        const { password, isAdmin,...others} = user._doc

        const token = jwt.sign(
            { _id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_TOKEN,
            {expiresIn: "2d"}
            
        )
        res.cookie("access_token",token,{maxAge: 90000,httpOnly: true}).status(200).json({details:{...others},isAdmin})
    }catch(err){
        res.status(500).json(err)
    }
}
//find user by id
export const findUser = async(req,res)=>{
    try{
        const findPerson = await users.findById(req.params.id)
        res.status(200).json(findPerson)

    }catch(err){
        res.status(500).json(err)
    }
}
//edit details
export const findUserAndEdit = async(req,res)=>{
    try{
        const findPersonAndEdit = await users.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
        res.status(200).json(findPersonAndEdit)
        
    }catch(err){
        res.status(500).json(err)
    }
}

//delete user
export const findUserAndDelete = async(req,res)=>{
    try{
       await users.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
        
    }catch(err){
        res.status(500).json(err)
    }
}

//count users
export const countUsers = async(req,res)=>{
    try{
       const countedUsers = await users.countDocuments()
        res.status(200).json(countedUsers)
        
    }catch(err){
        res.status(500).json(err)
    }
}


//find all users
export const getUsers = async(req,res)=>{
    try{
        const countedUsers = await users.find().sort({_id: -1})
         res.status(200).json(countedUsers)
         
     }catch(err){
         res.status(500).json(err)
     }
 }