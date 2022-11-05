import express from "express"
// import { generateToken } from "../Authentication/VerifyToken.js"
import { deposits, getBalance, payIntent,startSession, savedReason, stripePayment, withdraw } from "../Controllers/Transaction.js"
const router = express.Router()


//save amount
router.put("/savedamount/:id", savedReason)

//withdraw
router.put("/withdraw/:id", withdraw)

//deposit
router.put("/deposit/:id", deposits)

//getbalance
router.get("/balance/:id", getBalance)

//payment intent
router.post("/payintent", payIntent)


//stripepayment
router.post("/stripepays", stripePayment)

//stripepayment  SESSION
router.post("/stripesession", startSession)

//lipanampesa
// router.post("/lipanampesa",generateToken, lipanaMpesa)



export default router