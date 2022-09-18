import jwt from "jsonwebtoken";

//sign in user
export const aunthenticateUser = (req,res,next)=>{
    const token = req.cookies.access_token
    !token && res.status(400).json("Invalid token")
    jwt.verify(process.env.JWT_TOKEN,token,(err,user)=>{
        if(err){
           return res.status(400).json("Token expired")
        }else{
            req.user = user
            return next()
        }
    })
}

//sign in both user and admin

export const aunthenticateUserAndAdmin = (req,res,next)=>{
    aunthenticateUser(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
        next()
        }else{
            res.status(400).json("Error")
        }
    })
}

//sign in admin only
export const aunthenticateAdmin = (req,res,next)=>{
    aunthenticateUser(req,res,()=>{
        if(req.user.isAdmin){
        next()
    }else{
        res.status(400).json("Only admin")
    }
    })
}
