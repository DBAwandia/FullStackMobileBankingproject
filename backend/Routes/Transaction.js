import express from "express"
// import { generateToken } from "../Authentication/VerifyToken.js"
import { deposits, getBalance, startSession, savedReason, withdraw, payoutSession, stripeConnectId, twilioWhatsapp, twilioTransfers } from "../Controllers/Transaction.js"
const router = express.Router()

//stripepayment  SESSION
router.post("/stripesession/:id", startSession)

//stripePayout  SESSION
router.put("/stripepayout/:id", payoutSession)

//fetch connect acc id  
router.get("/connect/:id", stripeConnectId)

//TWILIO
//deposit message with twilio
router.post("/whatsapp/:id", twilioWhatsapp)

//Transfer and withdraw to two user same time message with twilio
router.post("/transfertwilio/:id", twilioTransfers)

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