import express from "express"
// import { generateToken } from "../Authentication/VerifyToken.js"
import { deposits, generateToken, getBalance, lipanaMpesa, savedReason, stripePayment, withdraw } from "../Controllers/Transaction.js"
const router = express.Router()


//save amount
router.put("/savedamount/:id", savedReason)

//withdraw
router.put("/withdraw/:id", withdraw)

//deposit
router.put("/deposit/:id", deposits)

//getbalance
router.get("/balance/:id", getBalance)

//stripepayment
router.post("/stripepays", stripePayment)

//lipanampesa
router.post("/lipanampesa",generateToken, lipanaMpesa)



export default router