import express,{Request,Response} from "express";

 
 import {newTable, CreateStudent,getAllStudentData,getStudentById,upDatedStudentData,deleteStudentDetail } from "../controller/studentController";
 
// import {controller} from "../controller/userController";
 
const router=express.Router()
 

// #######################################################################################################//
 
router.get("/table",newTable)
router.post("/createe",CreateStudent)
router.get("/allStudent",getAllStudentData)
 
 router.get("/student/:Student_id",getStudentById)
 
 
 
router.put("/update/:Student_id",upDatedStudentData)
 
router.delete("/student/:Student_id",deleteStudentDetail)
 
export{
    router
}
