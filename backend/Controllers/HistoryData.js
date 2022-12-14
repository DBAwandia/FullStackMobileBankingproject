import historys from "../Models/HistoryData.js"
import HistoryData from "../Models/HistoryData.js"
import User from "../Models/User.js"

//deposit history
export const saveDepoTransaction = async (req,res)=>{
    const name = req.body.name
    // const receiverName = req.body.receiverName
    // const senderNumber = req.body.senderNumber
    // const receiverNumber = req.body.receiverNumber
    const transactNumber = req.body.transactNumber
    const type = req.body.type
    const amount = req.body.amount
    const email = req.body.email
    const id = req.params.id.trim()
    const newTransaction =historys({
         
            transactNumber: transactNumber,
            amount: amount,
            type: type,
            name: name,
            email: email

        })
    try{
        const saved = await newTransaction.save()

        try{

         await User.findByIdAndUpdate(id, {$push: {history: saved.transactNumber}})
         console.log(id)

        }catch(err){
        res.status(500).json(err)
        }

        res.status(200).json(saved)
    
    }catch(err){
        res.status(500).json(err)
    }
}


//withdraw //Imternal transfer to users
export const saveWithdrawTransaction = async (req,res)=>{
    const name = req.body.name
    const senderNumber = req.body.senderNumber
    const transactNumber = req.body.transactNumber
    const type = req.body.type
    const receiverNumber = req.body.receiverNumber
    const amount = req.body.amount

    //notify sender or receiver
    // const send = req.body.send
    const send = "Received"


    //update receiver name
    const receiverNames = await User.findOne({uuid: receiverNumber})
    const isReceiverName = receiverNames.username
    const isReceiverNumber = receiverNames.uuid

    //save to db
    const newTransaction =historys({
         
            transactNumber: transactNumber,
            amount: amount,
            type: type,
            send:send,
            name: name,
            receiverName: isReceiverName,
            senderNumber: senderNumber,
            receiverNumber: isReceiverNumber,


        })
    try{
        const saved = await newTransaction.save()
        try{

         await User.findByIdAndUpdate(req.params.id, {$push: {history: saved.transactNumber}})
         await User.findOneAndUpdate({uuid:receiverNumber}, {$push: {history: saved.transactNumber}})
         await User.findOneAndUpdate({uuid: receiverNumber}, {$set: {send: send}}, {new: true})

        }catch(err){
        res.status(500).json(err)
        }

        res.status(200).json(saved)
    
    }catch(err){
        res.status(500).json(err)
    }
}

//get all transaction history
export const getallTransaction = async (req,res)=>{
    try{
        const getall = await historys.find().sort({_id: -1})
        res.status(200).json(getall)
    }catch(err){
        res.status(500).json(err)
    }
}


//get history per user transaction
export const usertransactionhistory = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const historydata = await Promise.all(user.history.map((item)=>{
            return historys.findOne({transactNumber: item})
        }))        
        res.status(201).json(historydata.reverse())
    }catch(err){
        res.status(500).json(err)
    }
}