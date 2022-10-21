import express from "express"
import { createCarsSavings, fetchCarsBalance, startCarsSavings, transferCarsSavings } from "../Controllers/Cars.js"
const router = express.Router()

//create CarsAccount
router.post("/createCarsSavings/:id",createCarsSavings)

//start saving
router.put("/startCarsSavings/:id",startCarsSavings)

//transfer saving
router.put("/transferCarsSavings/:id", transferCarsSavings)

//fetch balance
router.get("/fetchCarsBalance/:id",  fetchCarsBalance)



export default router