import express from "express"
import { carPlans, createCarsSavings, fetchCarsBalance, getPlans, startCarsSavings, transferCarsSavings } from "../Controllers/Cars.js"
const router = express.Router()

//create carplans
router.post("/createcarplans",carPlans)

//get carplans
router.get("/getcarplans",getPlans)

//create CarsAccount
router.post("/createCarsSavings/:id",createCarsSavings)

//start saving
router.put("/startCarsSavings/:id",startCarsSavings)

//transfer saving
router.put("/transferCarsSavings/:id", transferCarsSavings)

//fetch balance
router.get("/fetchCarsBalance/:id",  fetchCarsBalance)



export default router