import express,{Request,Response} from "express"

const router=express.Router()

import { newTable } from "../controller/studentController"
  router.get("/table",newTable)
export{
    router
}