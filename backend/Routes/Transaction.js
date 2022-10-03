import express from "express"
import { deposits, getBalance, stripePayment } from "../Controllers/Transaction.js"
const router = express.Router()


//save amount
// router.post("/savedamount", savedAmount)

//deposit
router.put("/deposit/:id", deposits)

//getbalance
router.get("/balance/:id", getBalance)

//stripepayment
router.post("/stripepay", stripePayment)



export default router