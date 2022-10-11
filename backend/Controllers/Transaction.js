import accountBalances from "../Models/Transaction.js"
import User from "../Models/User.js"
import axios from "axios"
import moment from "moment"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_KEY)
// const tokens = response.data.access_token

// save data
export const savedReason = async (req,res)=>{
    try{

    const paymentReason = req.body.paymentReason
    const users = await User.findById(req.params.id)
    const UUID = users.uuid
    const saved =await accountBalances.findOneAndUpdate({uuid: UUID}, {$set: {paymentReason: paymentReason}},{new: true})
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err)
    }
}

//withdraw
export const withdraw = async (req,res) =>{
    try{
        const users = await User.findById(req.params.id)
        const UID = users.uuid
        const balance = req.body.balance
        const UUID = req.body.uuid
        const getPrevbalance = await accountBalances.findOne({uuid: UID})
        const prevbalance = getPrevbalance.balance
        if(prevbalance < balance){
            res.status(400).json("Insufficient funds")
        }else{
               const withdrawal = await accountBalances.findOneAndUpdate({uuid: UID}, {$inc: {balance: -balance}},{new: true})
               await accountBalances.findOneAndUpdate({uuid:  UUID || req.body.uuid}, {$inc:{balance: balance}},{new: true})
            res.status(201).json(withdrawal)
        }

    }catch(err){
        res.status(500).json(err)
    }
}

//deposit
export const deposits = async (req,res) =>{
    try{
        const users = await User.findById(req.params.id)
        const UID = users.uuid
        // const balance = req.body.balance
        // const getPrevbalance = await accountBalances.findOne({uuid:UID})
        // const ids = getPrevbalance._id
        // const prevbalance = getPrevbalance.balance
      



        const deposited = await accountBalances.findOneAndUpdate({uuid: UID}, {$inc: {balance: req.body.balance}},{new: true})
        res.status(201).json(deposited)

    }catch(err){
        res.status(500).json(err)
    }
}

//get balance
export const getBalance = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const UID = user.uuid
        const getBalance = await accountBalances.findOne({uuid: UID})
        const balances = getBalance.balance

        res.status(200).json(balances)


    }catch(err){
        res.status(500).json(err)
    }
}

//stripe payment
export const stripePayment = async(req,res)=>{

    try{
        await stripe.charges.create({
            source : req.body.tokenId,
            amount : req.body.amount,
            currency: "usd"
        },(stripeRes , stripeErr)=>{
            if(stripeErr){
                res.status(401).json("Error" + stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        })

    }catch(err){
        res.status(500).json(err)
    }
}

//generate authToken
export const generateToken = async(req,res,next) =>{

    const consumer_secret = process.env.CONSUMER_SECRET
    const consumer_key = process.env.CONSUMER_KEY
    const Authorization = `Basic ${new Buffer.from(
        `${consumer_key}:${consumer_secret}`,
        'utf-8'
      ).toString('base64')}`;
    try{
        
        await  axios
            .get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
              headers: {
                authorization: Authorization
              }
            })
            .then((response) => {
              // Handle Success
              console.log(response.data.access_token)
                tokens = response.data.access_token
              next()
            })
            .catch((error) => {
               //Handle your error
               console.log(error)
            });
    }catch(err){
        res.status(500).json(err)
    }
}

//lipa na mpesa payment
export const lipanaMpesa = async (req,res)=>{
    const phonenumber = `+254 + ${req.body.phonenumber}`
    const amount = req.body.amount

    //generate timestamp
    const dateToday =moment().format()

    //password
    const shortCode = process.env.MY_PAYBILL
    const passkey = process.env.PASS_KEY
    const passwords = new Buffer.from( shortCode + passkey + dateToday,'utf-8' ).toString("base64")

    // `Basic ${new Buffer.from(
    //     `${consumer_key}:${consumer_secret}`,
    //     'utf-8'
    //   ).toString('base64')}`;
    try{
        
    await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {    
        BusinessShortCode: shortCode,    
        Password: passwords,    
        Timestamp: dateToday,     
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,    
        PartyA: phonenumber,    
        PartyB: shortCode,    
        PhoneNumber:phonenumber,    
        CallBackURL:"https://mydomain.com/pat",    
        AccountReference: phonenumber,    
        TransactionDesc:"Test"
        },
        {
            headers: {
                  Authorization: `Bearer ${tokens}`
            }
        }
    ).then((data)=>{
        // res.status(200).json(data.data)
        console.log(data.data)
    }).catch((err)=>{
        res.status(400).json(err + "err")
    })

    }catch(err){
        res.status(500).json(err)
    }
}