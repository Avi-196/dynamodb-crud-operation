import express,{Request,Response,Application} from "express"

const app:Application=express()

import {router} from "./routes/routes"

const PORT:Number=4000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use("/",router)

app.get("/test",(req:Request,res:Response)=>{
      res.send("hello world")
})

app.listen(PORT,():void=>{
    console.log("express is running on"+" "+4000)
})