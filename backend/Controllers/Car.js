import Car from "../Models/Car.js"
import caracccreateds from "../Models/Car.js"

//admin create default cars
export const carPlans = async(req,res)=>{
    const {type,price,photos} = req.body
    const savedAccount = Car({ photos: photos,price: price,type: type})
    try{
        const saved = await savedAccount.save()
        // await users.findByIdAndUpdate(req.params.id,{$set: {carPlans:saved._id}},{new:true})
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err)
    }
}
//get the cars
export const getPlans = async(req,res)=>{
    try{
        const getplans = await caracccreateds.find().sort({_id: -1}).limit(4)
        res.status(200).json(getplans)
    }catch(err){
        res.status(500).json(err)
    }
}