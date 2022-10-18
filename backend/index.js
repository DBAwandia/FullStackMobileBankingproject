import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()
app.use(cors())
app.use(cookieParser())
// app.use(express.json());


import userRouter from "./Routes/User.js"
// const userRouter = require ("./Routes/User.js")
import transactRouter from "./Routes/Transaction.js"
import historyRouter from "./Routes/HistoryData.js"

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true})
const db = mongoose.connection
db.on("err", ()=>console.log("Mongoose error"))
db.once("open", ()=>console.log("Server working"))

app.use("/api/User", userRouter)
app.use("/api/Transaction", transactRouter)
app.use("/api/HistoryData", historyRouter)
// app.get("/",(req,res)=>{
//     generateToken()
//     res.send("working")
// })


app.listen(`${PORT}`, ()=>console.log("Mongodb connected"))