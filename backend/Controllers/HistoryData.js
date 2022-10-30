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
    const uuid = req.body.uuid

    const newTransaction =historys({
         
            transactNumber: transactNumber,
            amount: amount,
            type: type,
            uuid:uuid,
            name: name

        })
    try{
        const saved = await newTransaction.save()

        try{

         await User.findByIdAndUpdate(req.params.id, {$push: {history: saved.transactNumber}})

        }catch(err){
        res.status(500).json(err)
        }

        res.status(200).json(saved)
    
    }catch(err){
        res.status(500).json(err)
    }
}


//withdraw
export const saveWithdrawTransaction = async (req,res)=>{
    const name = req.body.name
    const receiverName = req.body.receiverName
    const senderNumber = req.body.senderNumber
    const receiverNumber = req.body.receiverNumber
    const transactNumber = req.body.transactNumber
    const type = req.body.type
    const amount = req.body.amount
    const uuid = req.body.uuid

    const newTransaction =historys({
         
            transactNumber: transactNumber,
            amount: amount,
            type: type,
            uuid:uuid,
            name: name,
            receiverName: receiverName,
            senderNumber: senderNumber,
            receiverNumber: receiverNumber,


        })
    try{
        const saved = await newTransaction.save()

        try{

         await User.findByIdAndUpdate(req.params.id, {$push: {history: saved.transactNumber}})

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
        res.status(201).json(historydata)
    }catch(err){
        res.status(500).json(err)
    }
}