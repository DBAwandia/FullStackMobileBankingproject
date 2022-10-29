import express from "express"
import { createCarsSavings, fetchCarsBalance, fetchCreatedCarAcc, getCarById, startCarsSavings, transferCarsSavings } from "../Controllers/Cars.js"

const router = express.Router()

//get getCarById
router.get("/getcarplans/:id",getCarById)

//create CarsAccount
router.post("/createCarsSavings/:id",createCarsSavings)

//get CarsAccount
router.get("/getCarsSavings/:id",fetchCreatedCarAcc)

//start saving
router.put("/startCarsSavings/:id",startCarsSavings)

//transfer saving
router.put("/transferCarsSavings/:id", transferCarsSavings)

//fetch balance
router.get("/fetchCarsBalance/:id",  fetchCarsBalance)




export default router