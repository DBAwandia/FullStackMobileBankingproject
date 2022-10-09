import express from "express"
import { deposits, getBalance, savedReason, stripePayment, withdraw } from "../Controllers/Transaction.js"
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



export default router