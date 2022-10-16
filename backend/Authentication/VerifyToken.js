import jwt from "jsonwebtoken";
import axios from "axios"
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

//safaricom authToken
// export const generateToken = async(req,res,next) =>{

//     const secret = process.env.CONSUMER_SECRET
//     const consumer = process.env.CONSUMER_KEY
//     const auth = new Buffer.from( secret + ":" + consumer ).toString("base64")
//     try{
//        const data = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//         {
//             headers:{
//                 "Authorization": `Basic ${auth}`
//             }
//         }
//         )
//         // req.token = data['access_token'];
//         next()
//        console.log(data)
//     }catch(err){
//         res.status(500).json(err)
//     }
// }

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
//             //   console.log(response.data.access_token)
//               const token = response.data.access_token
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

