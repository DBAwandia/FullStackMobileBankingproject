import accountBalances from "../Models/Transaction.js"
import User from "../Models/User.js"
import stripe from "stripe"
const Stripe = stripe(process.env.STRIPE_KEY)

// const stripe = require("stripe")(process.env.STRIPE_KEY)

//save data
// export const savedAmount = async (req,res)=>{
//     const balance = req.body.balance
//     const saved = accountBalances({balance: balance})
//     try{
//         const savedBal = await saved.save()
//         res.status(200).json(savedBal)
//     }catch(err){
//         res.status(500).json(err)
//     }
// }

//deposit
export const deposits = async (req,res) =>{
    try{
        const users = await User.findById(req.params.id)
        const UID = users.uuid
        const balance = req.body.balance
        const getPrevbalance = await accountBalances.findOne({uuid:UID})
        const prevbalance = getPrevbalance.balance


        const deposited = await accountBalances.findOneAndUpdate({uuid: UID}, {$inc: {balance: req.body.balance}},{upsert: true})
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
         await Stripe.charges.create({
             source : req.body.tokenId,
             currency: "usd",
             amount : req.body.amount
            
        },(stripeRes,stripeErr)=>{
            if(stripeErr){
                res.status(400).json("Invalid")
            }else{
                res.status(200).json(stripeRes)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
}