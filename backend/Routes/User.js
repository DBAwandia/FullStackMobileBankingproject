import express from "express"
import { aunthenticateAdmin, aunthenticateUser, aunthenticateUserAndAdmin } from "../Authentication/VerifyToken.js"
const router = express.Router()
import {loginUser, registerUser,findUser, findUserAndEdit,findUserAndDelete,countUsers} from "../Controllers/User.js"
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



export default router