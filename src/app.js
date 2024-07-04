import express, { urlencoded } from "express"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
// import apicache from "apicache"

const app = express()
// let cache = apicache.middleware


app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())
// app.use(cache('5 minutes'))

app.get("/",(req,res)=>{
    res.send("Home server running")
})

app.use("/api/v1/users",userRouter)

export {app}