import express from "express"
import { VerifyTokenAdminOnly, VerifyToken, VerifyTokenUserAndAdmin } from "../Authentication/VerifyToken.js"
const router = express.Router()
import {loginUser, registerUser,findUser, findUserAndEdit,getUsers,findUserAndDelete,countUsers, getUserbyUid} from "../Controllers/User.js"
//register
router.post("/register", registerUser)

//login
router.post("/login", loginUser)

//find user by id
router.get("/find/:id", findUser)

//edit user
router.put("/findAndEdit/:id", findUserAndEdit)

//delete user
router.delete("/findAndDelete/:id", findUserAndDelete)

//count users
router.get("/countUsers", countUsers)

//find all users
router.get("/findUsers", getUsers)

//get user by uuid
router.get("/findUuid", getUserbyUid)




export default router