import cars from "../Models/Cars.js"
import users from "../Models/User.js"
import accountBalances from "../Models/Transaction.js"
import Car from "../Models/Car.js"


//user create cars account
export const createCarsSavings = async (req,res) =>{
    const minm = 10000000
    const maxm = 99999999
    const generateUID = Math.floor(Math.random() * (maxm - minm + 1) - minm )
    const uuid= generateUID
    
    //uid of user
    const UID = await users.findById(req.params.id)
    const uid = UID.uuid

    const {amount,theCaridx} = req.body
    const savedAccount = cars({ uuid: uuid,amount: amount,theCaridx})
    try{
        const createdAcc = await savedAccount.save()

        //get initial amount
        const initalAmount =await accountBalances.findOne({uuid: uid})
        const amountAvailable =initalAmount.balance
        // console.log(amountAvailable)
        if(amountAvailable < amount){
            res.status(400).json("insufficient funds")
        }else{
            //push the uuid to user and use it to fetch carsSavings on frontend
            await users.findByIdAndUpdate(req.params.id, {$set: {cars: createdAcc.uuid }},{new: true})

            //update startamouny in savings
            await cars.findOneAndUpdate({uuid: createdAcc.uuid }, {$inc: {balance: amount}}, {new: true})
            await accountBalances.findOneAndUpdate({uuid:uid}, {$inc: {balance:-amount }},{new: true})

            res.status(200).json(createdAcc)
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}

//get the carsbyid
export const getCarById = async(req,res)=>{
    try{
        const getCarsById = await cars.findById(req.params.id)
        res.status(200).json(getCarsById)
    }catch(err){
        res.status(500).json(err)
    }
}

//fetch the createdCarAccount
export const fetchCreatedCarAcc = async (req,res)=>{
    try{
        const user = await users.findById(req.params.id)
        const carCreatedUid = user.cars
        // console.log(carCreatedUid)
        const fetchCarData = await cars.findOne({uuid:carCreatedUid})

        //get the wxact details
        const fetchCarDetail = await Car.findById(fetchCarData.theCaridx)
        
        res.status(200).json(fetchCarDetail)
    }catch(err){
        res.status(500).json(err)
    }
}


//transfer to the created cars account || from main to cars account
export const startCarsSavings = async (req,res) =>{
   const {amount} = req.body
    // const amount="20"
    const carsUuid = await users.findById(req.params.id)
    const carsUID = carsUuid.cars

    // const uuid = carsUuid.uuid
    const accBalancUID = carsUuid.uuid

    try{
        const allBalance = await accountBalances.findOne({uuid: accBalancUID}) 
        const currentBlance = allBalance.balance
        
        if(currentBlance < amount) {
            res.status(400).json("insufficient")
        }else{
            const transfer = await cars.findOneAndUpdate({uuid: carsUID}, {$inc : { balance: amount}}, {new: true})
             await accountBalances.findOneAndUpdate({uuid: accBalancUID}, {$inc: {balance: -amount}}, {new: true})
          
            res.status(200).json(transfer)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

//transfer from carsSavings to main account
export const transferCarsSavings = async (req,res) =>{
    const {amount} = req.body
//  const amount="20"
     const carsUuid = await users.findById(req.params.id)
     const carsUID = carsUuid.cars
     const mainAccUid = carsUuid.uuid
     const uuid = carsUID
     try{
         const carsBalance = await cars.findOne({uuid: uuid}) 
         const currentBlance = carsBalance.balance
         if(currentBlance < amount) {
             res.status(400).json("insufficient funds")
         }else{
             const transfer = await cars.findOneAndUpdate({uuid: uuid}, {$inc : { balance: -amount}}, {new: true})
                 await accountBalances.findOneAndUpdate({uuid:mainAccUid },{$inc: {balance: amount}}, {new: true})

             res.status(200).json(transfer)
         }
     }catch(err){
         res.status(500).json(err)
     }
 }

 //fetch balance
 export const fetchCarsBalance = async (req,res)=>{
    const carsId = await users.findById(req.params.id)
    const carsID = carsId.cars

    try{
        const getCarsbalance = await cars.findOne({uuid: carsID})
        const balance = getCarsbalance.balance
        res.status(200).json(balance)
    }catch(err){
        res.status(500).json(err)
    }
 }