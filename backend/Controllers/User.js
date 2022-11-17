// import User from "../Models/User.js"
import express from "express";
import User from "../Models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken";
import accountBalances from "../Models/Transaction.js"
import Cars from "../Models/Cars.js";
import axios from "axios"
import  Twilio  from "twilio";
import moment from "moment";
const client = new Twilio("ACedfb52c1fe7c0c43ace05a14f68088e6","44dcee57ad196994b2a3b8a292603f80");

//register
export const registerUser = async( req,res)=>{
    //generate uuid
    var minm = 1000000;
    var maxm = 9999999;
    const generatedNumbers = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
   const {username,photos,history,phonenumber} = req.body
   console.log(phonenumber)
   const uuid= generatedNumbers
   const password = CryptoJS.AES.encrypt(req.body.password, (process.env.PASS_SEC));
   const newUser =User({password: password,phonenumber:phonenumber,username: username,history: history,uuid:uuid,photos:photos}
       )

   const saveUuidToAccountSchema = accountBalances({uuid: generatedNumbers})
   
   //generate timestamp
//    const date = new Date()
//    const timeStamp = moment(date).format("DD/MM/YYYY  HH:mm:ss a")

   try{
       const oldUser = await User.findOne({ phonenumber: phonenumber})
       if(oldUser){
          return res.status(400).json("Already exists")
       }else {
                       const user = await newUser.save()
                       await saveUuidToAccountSchema.save()
                       //send message to user after registering
                    //    try{
                    //     await  client.messages
                    //        .create({
                    //            body: `CONGRATULATIONS ${user.username}. Account created. on ${timeStamp}. Your account number is ${user.uuid}. Availabale balnce is $${bal.balance}. We are happy serving you !!!!`,
                    //            from: '+18148592232', 
                    //            to: `+${phonenumber}`}).then((message)=> console.log(message.body))
                
                    //     }catch(err){
                    //         res.status(500).json(err)
                    //     }

                        //registration response
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
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8).trim()
            originalPassword !== req.body.password  && res.status(400).json("Put correct password")
            console.log(originalPassword)
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

//remove duplicate names uuid after sending internal to other customers
export const removeduplicate = async (req,res)=>{
    const user = await User.findById(req.params.id)
    const allUserUID = user.recentFriends.reverse()

    //update removed duplicates
    let pushEmptyUserUID = []

    //limit array fetch
    // let limitedArray = pushEmptyUserUID.filter((val, i) => i < 2)

    try{
        allUserUID.forEach((item)=>{
            if(pushEmptyUserUID.indexOf(item) < 0){
                pushEmptyUserUID.push(item)
            }
        })

        //get the users photos and name
        const pushedUser = await Promise.all( (pushEmptyUserUID.map((item)=>{
            return User.findOne({ uuid: item})

        })))

        const photos = pushedUser.map(item => item.photos)
        const usernames = pushedUser.map(item => item.username)
        res.status(200).json({details: {photos,usernames}})
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
    const id = req.params.userid
    const idz = id.trim()
    console.log(idz)

             try{
                const findPersonAndEdit = await User.findByIdAndUpdate(idz,{$set: req.body}, {new: true})
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

 //get user by their uuid query
 export const getUserbyUid = async (req,res)=>{
    const QUERYUID = req.query.QUERYUID
    try{
        const getUser = await User.findOne({uuid: QUERYUID})
        res.status(200).json(getUser)
        
    }catch(err){
        res.status(500).json(err)
    }
 }

  //get user by their uuid body
  export const getUserbyUuid = async (req,res)=>{
    const uuid = req.body.uuid
    try{
        const getUser = await User.findOne({uuid: uuid})
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
 