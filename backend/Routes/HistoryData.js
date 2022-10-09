import express from "express"
import { getallTransaction, saveTransaction, usertransactionhistory } from "../Controllers/HistoryData.js"
const router = express.Router()

//savetransaction
router.post("/savedhistory/:id", saveTransaction)

//get all transactions
router.get("/getallhistory", getallTransaction)


//get each user transaction
router.get("/gethistory/:id", usertransactionhistory)


export default router
