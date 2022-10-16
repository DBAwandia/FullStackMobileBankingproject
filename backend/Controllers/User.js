// import People from "../Models/User.js"
import People from "../Models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken";
import accountBalances from "../Models/Transaction.js"

//register
export const registerUser = async( req,res)=>{
    const username = req.body.username
    const phonenumber = req.body.phonenumber
    const photos = req.body.photos
    const uuid = req.body.uuid
    const history = req.body.history
    const password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
    const newUser =People({password: password,phonenumber:phonenumber,username: username,history: history,uuid:uuid,photos:photos}
        )

    
    //generate uuid
    var minm = 1000000;
    var maxm = 9999999;
    const added = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    // const savedUser = People({username: username,phonenumber:phonenumber,password: password,uuid: added})
    const savedPeople = accountBalances({uuid: added})
    try{
        const oldUser = await People.findOne({ phonenumber: req.body.phonenumber})
        if(oldUser){
           return res.status(400).json("Already exists")
        }else{
                        const user = await newUser.save()
                        await savedPeople.save()
                  
                        res.status(200).json(user)
        }

    }catch(err){
        res.status(500).json(err)
    }

}
//login
export const loginUser = async (req,res)=>{
    try{
        const user = await People.findOne({phonenumber: req.body.phonenumber})
        // if(!user){
        //     res.status(400).json("please register")
        // }else{
        
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
        // }
    }catch(err){
        res.status(500).json(err)
    }
}
//reset password
export const resetPassword = async (req,res)=>{
    const phonenumber = req.body.phonenumber
    try{
        const user = await People.findOne({phonenumber: phonenumber})
        !user && res.status(400).json("inavilid")
        const phoneNumber = user.phonenumber
        const editedPassword = await People.findOneAndUpdate({phonenumber: phoneNumber}, {$set: {password: req.body.password}}, {new: true})
        res.status(200).json(editedPassword)
    }catch(err){
        res.status(500).json(err)
    }
}

//find user by id
export const findUser = async(req,res)=>{
    try{
        const findPerson = await People.findById(req.params.id)
        res.status(200).json(findPerson)

    }catch(err){
        res.status(500).json(err)
    }
}
//edit details
export const findUserAndEdit = async(req,res)=>{
    try{
        const findPersonAndEdit = await People.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
        res.status(200).json(findPersonAndEdit)
        
    }catch(err){
        res.status(500).json(err)
    }
}

//delete user
export const findUserAndDelete = async(req,res)=>{
    try{
       await People.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
        
    }catch(err){
        res.status(500).json(err)
    }
}

//count People
export const countPeople = async(req,res)=>{
    try{
    
       
       const countedPeople = await People.countDocuments()
        res.status(200).json(countedPeople)
        
    }catch(err){
        res.status(500).json(err)
    }
}


//find all People
export const getPeople = async(req,res)=>{
    try{
        const countedPeople = await People.find().sort({_id: -1})
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
        const getUser = await People.findOne({uuid: QUERYUID})
        res.status(200).json(getUser)
        
    }catch(err){
        res.status(500).json(err)
    }
 }
 