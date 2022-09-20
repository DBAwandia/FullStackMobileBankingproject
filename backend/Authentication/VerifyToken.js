import jwt from "jsonwebtoken";

//sign in user
export const VerifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) {return res.status(400).json("Invalid token")}

    //make sure you start with token
    jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
        if(err){
            res.status(403).json("Token expired")
        }else{
            req.user = user
             next()
        }
    })
}

//sign in both user and admin
export const VerifyTokenUserAndAdmin = (req,res,next)=>{
    VerifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
        next()
        }else{
            res.status(403).json("Error")
        }
    })
}

//sign in admin only
export const VerifyTokenAdminOnly = (req,res,next)=>{
    VerifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
        next()
    }else{
        res.status(403).json("Only admin")
    }
    })
}
