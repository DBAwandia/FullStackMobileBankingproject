import express from "express"
import { getallTransaction, saveDepoTransaction, saveWithdrawTransaction, usertransactionhistory } from "../Controllers/HistoryData.js"
const router = express.Router()

//saveDeositTransaction
router.post("/savedDepohistory/:id", saveDepoTransaction)

//saveWithdrawTransaction
router.put("/savedWithdrawhistory/:id",saveWithdrawTransaction )

//get all transactions
router.get("/getallhistory", getallTransaction)


//get each user transaction
router.get("/gethistory/:id", usertransactionhistory)


//deposit history


//withdraw history

export default router
