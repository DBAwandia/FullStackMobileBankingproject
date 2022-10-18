import express from "express"
import { VerifyTokenAdminOnly, VerifyToken, VerifyTokenUserAndAdmin } from "../Authentication/VerifyToken.js"
const router = express.Router()
import People from "../Models/User.js"
import accountBalances from "../Models/Transaction.js"
import CryptoJS from "crypto-js"
import { findUser, findUserAndEdit,findUserAndDelete, getUserbyUid, resetPassword, loginUser, registerUser} from "../Controllers/User.js"
//register
router.post("/register", registerUser)
//login
router.post("/login", loginUser)


//reset password
router.put("/reset", resetPassword)

//find user by id
router.get("/find/:id", findUser)

//edit user
router.put("/findAndEdit/:id", findUserAndEdit)

//delete user
router.delete("/findAndDelete/:id", findUserAndDelete)

//count users
// router.get("/countUsers", countUsers)

//find all users
// router.get("/findUsers", getUsers)

//get user by uuid
router.get("/findUuid", getUserbyUid)

// router.put("/findz",findPer)




export default router