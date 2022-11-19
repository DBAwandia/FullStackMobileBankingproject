import accountBalances from "../Models/Transaction.js"
import User from "../Models/User.js"
import axios from "axios"

import moment from "moment"
import Stripe from "stripe"
const Stripetok = Stripe("sk_test_51LHrwyBVP5viye6wmhsWZItJJbT27wFLjOeYTPHmll3Jq3It0fsuN5DeXVx7tPgy0va95bJ0VBvsg7yO2LNeae4900PAfSisDx")

//twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import  Twilio  from "twilio";
const client = new Twilio("ACedfb52c1fe7c0c43ace05a14f68088e6","44dcee57ad196994b2a3b8a292603f80");

// twilio send message to user after deposit
export const twilioWhatsapp = async (req,res) =>{
        // //fetch userbalance
        const paramsID =req.params.id
        const paramsIDtrim = paramsID.trim()
        const registeredUser = await User.findById(paramsIDtrim)

        // // accoutBalanceUID same as user UUID
        const accoutBalanceUID = registeredUser.uuid

        const {amount,uid,phonenumber} = req.body

        // //get balance
        const accountBalance = await accountBalances.findOne({uuid: accoutBalanceUID})
        const accBalance = accountBalance.balance

        //get timestamp pm or aMm
        const date = new Date()
        const timestamp = moment(date).format("DD/MM/YYYY  HH:mm A" )
        try{
            const message = await client.messages
             .create({
                body: `QK${uid} DEPOSIT CONFIRMED. $${amount} paid to your accoount. on ${timestamp}. Balance is $${accBalance}. Transaction cost $0.00. We are happy to serve you!! `,
                 from: '+18148592232', 
                 to: `+${phonenumber}`})
             res.status(200).json(message)
            }catch(err){
                res.status(500).json(err)
            }   
}

//STRIPE SESSION
export const startSession = async (req,res)=>{

    //dormain to redirect after successfull
    const success_url = "http://localhost:3000/"
    const cancel_url = "http://localhost:3000/depotype"

    const customer_email = "ken@gmail.com"
    const {line_items} = req.body
    //validate req.body
    if(!line_items || !customer_email){
        return res.status(403).json("Inavlid paramaters")
    }else{
    try{
        const session = await Stripetok.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email, 
            line_items,
            success_url: `${success_url}?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url:  `${cancel_url}`,
            mode: 'payment',
          });
          res.status(200).json(session)
    }catch(err){
        res.status(500).json(err)
        console.log("err")
    }
} 
}

//payouts
export const payoutSession = async (req,res)=>{
  
    const { email} =req.body
    
    //get date for TOR stripe_date
    const tos_acceptance_date = Math.floor(Date.now()/ 1000)

    //fetch user IP_address
    const ipAddress = await axios.get("https://hutils.loxal.net/whois")
    const ip = ipAddress.data.ip
    
    try{
        const account = await Stripetok.accounts.create({
            country:"US",
            type: 'custom',
            email,
            capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
          });
          const id = account.id
          

          //save the CONNECT_ACC ID TO DATABASE
          try{
            await User.findByIdAndUpdate(req.params.id,{$set: {stripeID: id}},{new: true})
          }catch(err){
            console.log(err)
          }
          const accounts = await Stripetok.accounts.update(
            // '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
            id,
            {tos_acceptance: {date: tos_acceptance_date, ip: ip}}
          );
          res.status(200).json({details: {accounts},id})
    }catch(err){
        res.status(500).json(err)
        console.log("err")
    }
}

//get then stripe_connect_id
export const stripeConnectId = async(req,res)=>{
  try{

    const stripe_conect_id = await User.findById(req.params.id)
    const ACC_ID =stripe_conect_id.stripeID

    //retrieve account details using connect id
    const account = await Stripetok.accounts.retrieve(
        ACC_ID
      );
    res.status(200).json(account)

  }catch(err){
    res.status(500).json(err)
  }
}

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

//sms77io RAPID API docs
export const sms77io = async(req,res)=>{
    const encodedParams = new URLSearchParams();
encodedParams.append("to", "+491771783130");
encodedParams.append("p", "e27f35633emshd4906d1f252d8d9p1d5dddjsnd00b28b8e51b");
encodedParams.append("text", "Dear customer. We want to say thanks for your trust. Use code MINUS10 for 10 % discount on your next order!");

const options = {
  method: 'POST',
  url: 'https://sms77io.p.rapidapi.com/sms',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'e27f35633emshd4906d1f252d8d9p1d5dddjsnd00b28b8e51b',
    'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}


//twilio transfer sms to the two users transacting
export const twilioTransfers = async (req,res)=>{
    try{
        //req.body
        const {receiveruid, amount ,transactID} = req.body

        //timestamp
        const date = new Date()
        const timeStamp = moment(date).format("DD/MM/YYYY  HH:mm A")

        //sender balance
        const user = await User.findById(req.params.id)
        const sender_name = user.username
        const sender_phonenumber = user.phonenumber
        const UUID = user.uuid
        const balance = await accountBalances.findOne({uuid: UUID})
        const accbal = balance.balance

        //receiver balance
        const receiver_nameANDnumber = await User.findOne({uuid: receiveruid})
        const receiver_his_name = receiver_nameANDnumber.username
        const receiver_phonenumber = receiver_nameANDnumber.phonenumber
        const receiver = await accountBalances.findOne({uuid: receiveruid})
        const receivebal = receiver.balance

        //sender message send after transaction
        try{
            await client.message.create({
                body:`QK${transactID} TRANSFER SUCCESSFUL !!!. Sent $${amount} to ${receiver_his_name}, phonenumber ${receiver_phonenumber}. on ${timeStamp}.New balance is ${accbal}.We are always ready to serve you!!`,
                from:"+18148592232",
                to:`+${sender_phonenumber}`
            })

          //receiver message send after transaction
          try{
            const message = await client.message.create({
                body:`QK${transactID} DEPOSIT SUCCESSFUL !!!. Received $${amount} from ${sender_name}, phonenumber ${sender_phonenumber}. on ${timeStamp}.New balance is ${receivebal}.We are always ready to serve you!!`,
                from:"+18148592232",
                to:`+${receiver_phonenumber}`
            })
        }catch(err){
            res.status(500).json(err)
        }

        }catch(err){
            res.status(500).json(err)
        }

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
        //validate the user to send money
        const usertOSENDMONEY = await User.findOne({uuid: UUID})
        // console.log(usertOSENDMONEY.uuid)
        usertOSENDMONEY.uuid !== UUID || req.body.uuid && res.status(400).json(err + "err")
         
        const getPrevbalance = await accountBalances.findOne({uuid: UID})
        const prevbalance = getPrevbalance.balance
        if(prevbalance < balance){
            res.status(400).json("Insufficient funds")
        }else{
               const withdrawal = await accountBalances.findOneAndUpdate({uuid: UID}, {$inc: {balance: -balance}},{new: true})
               await accountBalances.findOneAndUpdate({uuid:  UUID || req.body.uuid}, {$inc:{balance: balance}},{new: true})
               //push uuid of the receiver so that it can filter recent friends
                await User.findByIdAndUpdate(req.params.id, {$push: {recentFriends: UUID}}, {new: true})

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
        const balance = req.body.balance
        // const getPrevbalance = await accountBalances.findOne({uuid:UID})
        // const ids = getPrevbalance._id
        // const prevbalance = getPrevbalance.balance
      



        const deposited = await accountBalances.findOneAndUpdate({uuid: UID}, {$inc: {balance: req.body.balance || balance}},{new: true})
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




//generate authToken
// export const generateToken = async(req,res,next) =>{

//     const consumer_secret = process.env.CONSUMER_SECRET
//     const consumer_key = process.env.CONSUMER_KEY
//     const Authorization = `Basic ${new Buffer.from(
//         `${consumer_key}:${consumer_secret}`,
//         'utf-8'
//       ).toString('base64')}`;
//     try{
        
//         await  axios
//             .get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
//               headers: {
//                 authorization: Authorization
//               }
//             })
//             .then((response) => {
//               // Handle Success
//               console.log(response.data.access_token)
//                 tokens = response.data.access_token
//               next()
//             })
//             .catch((error) => {
//                //Handle your error
//                console.log(error)
//             });
//     }catch(err){
//         res.status(500).json(err)
//     }
// }

//lipa na mpesa payment
// export const lipanaMpesa = async (req,res)=>{
//     const phonenumber = `+254 + ${req.body.phonenumber}`
//     const amount = req.body.amount

//     //generate timestamp
    // const dateToday =moment().format()

//     //password
//     const shortCode = process.env.MY_PAYBILL
//     const passkey = process.env.PASS_KEY
//     const passwords = new Buffer.from( shortCode + passkey + dateToday,'utf-8' ).toString("base64")

//     // `Basic ${new Buffer.from(
//     //     `${consumer_key}:${consumer_secret}`,
//     //     'utf-8'
//     //   ).toString('base64')}`;
//     try{
        
//     await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//         {    
//         BusinessShortCode: shortCode,    
//         Password: passwords,    
//         Timestamp: dateToday,     
//         TransactionType: "CustomerPayBillOnline",
//         Amount: amount,    
//         PartyA: phonenumber,    
//         PartyB: shortCode,    
//         PhoneNumber:phonenumber,    
//         CallBackURL:"https://mydomain.com/pat",    
//         AccountReference: phonenumber,    
//         TransactionDesc:"Test"
//         },
//         {
//             headers: {
//                   Authorization: `Bearer ${tokens}`
//             }
//         }
//     ).then((data)=>{
//         // res.status(200).json(data.data)
//         console.log(data.data)
//     }).catch((err)=>{
//         res.status(400).json(err + "err")
//     })

//     }catch(err){
//         res.status(500).json(err)
//     }
// }