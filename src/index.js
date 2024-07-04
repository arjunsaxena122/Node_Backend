import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./db/index.js"

dotenv.config({
    path: "./.env"
})

connectDB();

app.listen(process.env.PORT,()=>{
    console.log("listening server at 9000")
})