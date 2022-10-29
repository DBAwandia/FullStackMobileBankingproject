import express from "express"
import { carPlans, getPlans } from "../Controllers/Car.js"
const router = express.Router()

//create carplans
router.post("/createcarplans",carPlans)

//get carplans
router.get("/getcarplans",getPlans)




export default router
