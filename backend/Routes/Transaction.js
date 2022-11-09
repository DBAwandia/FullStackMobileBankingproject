import express from "express"
// import { generateToken } from "../Authentication/VerifyToken.js"
import { deposits, getBalance, startSession, savedReason, withdraw, payoutSession, stripeConnectId, twilioWhatsapp } from "../Controllers/Transaction.js"
const router = express.Router()

//stripepayment  SESSION
router.post("/stripesession/:id", startSession)

//stripePayout  SESSION
router.put("/stripepayout/:id", payoutSession)

//fetch connect acc id  
router.get("/connect/:id", stripeConnectId)

//whatsapp twilio
router.post("/whatsapp/:id", twilioWhatsapp)

//save amount
router.put("/savedamount/:id", savedReason)

//withdraw
router.put("/withdraw/:id", withdraw)

//deposit
router.put("/deposit/:id", deposits)

//getbalance
router.get("/balance/:id", getBalance)



//lipanampesa
// router.post("/lipanampesa",generateToken, lipanaMpesa)



export default router