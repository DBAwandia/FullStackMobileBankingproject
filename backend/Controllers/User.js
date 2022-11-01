// import User from "../Models/User.js"
import express from "express";
import User from "../Models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken";
import accountBalances from "../Models/Transaction.js"
import Cars from "../Models/Cars.js";
import axios from "axios"
let app = express();

//response as Json
app.use(express.json()); 

//Parse x-www-form-urlencoded request into req.body
app.use(express.urlencoded({ extended: true }));  

//register
export const registerUser = async( req,res)=>{
    //generate uuid
    var minm = 1000000;
    var maxm = 9999999;
    const generatedNumbers = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
   const {username,photos,history,phonenumber} = req.body
   const uuid= generatedNumbers
   const password = CryptoJS.AES.encrypt(req.body.password, (process.env.PASS_SEC));
   const newUser =User({password: password,phonenumber:phonenumber,username: username,history: history,uuid:uuid,photos:photos}
       )

   const saveUuidToAccountSchema = accountBalances({uuid: generatedNumbers})

   try{
       const oldUser = await User.findOne({ phonenumber: phonenumber})
       if(oldUser){
          return res.status(400).json("Already exists")
       }else {
                       const user = await newUser.save()
                       await saveUuidToAccountSchema.save()

                       //bug ,returns undefined after console.log
                         res.status(200).json(user)
       }

   }catch(err){
     return  res.status(500).json(err)
   }

}

//login
export const loginUser = async (req,res)=>{
    try{
        const user = await User.findOne({phonenumber: req.body.phonenumber})
        if(!user){
            res.status(400).json("please register")
            
        }else{
        
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            originalPassword !== req.body.password  && res.status(400).json("Put correct password")

        const { password, isAdmin,...others} = user._doc

        const token = jwt.sign(
            { _id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_TOKEN,
            {expiresIn: "2d"}
            
        )
        res.cookie("access_token",token,{maxAge: 90000,httpOnly: true}).status(200).json({details:{...others},isAdmin})
        }
    }catch(err){
        res.status(500).json(err)
    }
}
//reset password
export const resetPassword = async (req,res)=>{
    const phonenumber = req.body.phonenumber
    try{
        const user = await User.findOne({phonenumber: phonenumber})
        !user && res.status(400).json("inavilid")
        const phoneNumber = user.phonenumber
        const editedPassword = await User.findOneAndUpdate({phonenumber: phoneNumber}, {$set: {password: req.body.password}}, {new: true})
       return res.status(200).json(editedPassword)
    }catch(err){
        res.status(500).json(err)
    }
}

//find user by id
export const findUser = async(req,res)=>{
    try{
        const findPerson = await User.findById(req.params.id)
        res.status(200).json(findPerson)

    }catch(err){
        res.status(500).json(err)
    }
}
//edit details
export const findUserAndEdit = async(req,res)=>{
    try{
        const findPersonAndEdit = await User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
        res.status(200).json(findPersonAndEdit)
        
    }catch(err){
        res.status(500).json(err)
    }
}

//delete user
export const findUserAndDelete = async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
        
    }catch(err){
        res.status(500).json(err)
    }
}

//count User
export const countPeople = async(req,res)=>{
    try{
    
       
       const countedPeople = await User.countDocuments()
        res.status(200).json(countedPeople)
        
    }catch(err){
        res.status(500).json(err)
    }
}


//find all User
export const getUsers = async(req,res)=>{

    try{
        const countedPeople = await User.find().sort({_id: -1})
         res.status(200).json(countedPeople)
         
     }catch(err){
         res.status(500).json(err)
     }
 }

 //get user by their uuid
 export const getUserbyUid = async (req,res)=>{
    const UUID = req.body.uuid
    const QUERYUID = req.query.QUERYUID
    try{
        const getUser = await User.findOne({uuid: QUERYUID})
        res.status(200).json(getUser)
        
    }catch(err){
        res.status(500).json(err)
    }
 }
  //get car by their uuid
  export const getCarbyUid = async (req,res)=>{
    const carUuid=await User.findById(req.params.id)
    const thecarUuid =carUuid.cars
    console.log(thecarUuid)
    try{
        const getCar = await Cars.findOne({uuid: thecarUuid})
        res.status(200).json(getCar)
        
    }catch(err){
        res.status(500).json(err)
    }
 }


 //stk push
 export const stkPush = async (req, res) => {
    const phonenumber = req.body.phonenumber;
    const amount = req.body.amount;
    

    const date = new Date();
    const timeStamp = date.getFullYear() + 
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

    // const timeStamp = moment().format();
console.log(timeStamp)
    const shortCode = process.env.MY_PAYBILL;
    const passKey = process.env.PASS_KEY;

    const password = new Buffer.from(shortCode + passKey + timeStamp).toString(
        "base64"
    );

        await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: shortCode,
                Password: password,
                Timestamp: timeStamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phonenumber,
                PartyB: shortCode,
                PhoneNumber: phonenumber,
                CallBackURL: "https://kandy-hamisi.github.io/",
                AccountReference: phonenumber,
                TransactionDesc: "Test",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((data) => {
            console.log(data.data)
            res.status(200).json(data.data)
        }).catch((err) => {
            console.log(err)
            res.status(400).json(err.message);
        })
}
 