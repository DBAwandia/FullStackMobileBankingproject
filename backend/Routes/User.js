import express from "express"
import { VerifyTokenAdminOnly, VerifyToken, VerifyTokenUserAndAdmin, generateToken } from "../Authentication/VerifyToken.js"
const router = express.Router()
import { findUser,getUsers, findUserAndEdit,findUserAndDelete, getUserbyUid, resetPassword, loginUser, registerUser, getCarbyUid, stkPush, getUserbyUuid} from "../Controllers/User.js"
//register
router.post("/register", registerUser)

//login
router.post("/login", loginUser)

//reset password
router.put("/reset", resetPassword)

//saf generate token
router.post("/gettoken",generateToken,stkPush)

//find all users
router.get("/findUsers", getUsers)

//get user by uuid query
router.get("/findUuid", getUserbyUid)

//get user by uuid body
router.get("/finduseruuid", getUserbyUuid)

//find user by id
router.get("/find/:id", findUser)

//edit user
router.put("/findAndEdit/:userid", findUserAndEdit)

//delete user
router.delete("/findAndDelete/:id", findUserAndDelete)

//count users
// router.get("/countUsers", countUsers)


// router.put("/findz",findPer)

//query saving
router.get("/queryCarsSavings/:id",getCarbyUid)



export default router