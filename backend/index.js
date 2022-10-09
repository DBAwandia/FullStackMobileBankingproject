import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./Routes/User.js"
import transactRouter from "./Routes/Transaction.js"
import historyRouter from "./Routes/HistoryData.js"
import cookieParser from "cookie-parser"
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true})
const db = mongoose.connection
db.on("err", ()=>console.log("Mongoose error"))
db.once("open", ()=>console.log("Server working"))

app.use("/api/User", userRouter)
app.use("/api/Transaction", transactRouter)
app.use("/api/HistoryData", historyRouter)



app.listen(`${PORT}`, ()=>console.log("Mongodb connected"))