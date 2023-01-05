import AWS, {DynamoDB} from "aws-sdk";
 import { Request,Response } from "express";
 
AWS.config.update({
    region: "ap-northeast-1",
    accessKeyId: "AKIAXMHN3LOMUG4XE3H4",
    secretAccessKey: "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"
 
})
// const db=new AWS.DynamoDB.DocumentClient()
 
 const db : DynamoDB = new AWS.DynamoDB();
 const dbClient : DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();
 
 
 
 const newTable=():void=>{
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'Student_id',
          AttributeType: 'S'
        }
   
      ],
      KeySchema: [
        {
          AttributeName: 'Student_id',
          KeyType: 'HASH'
        }
       
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      TableName: 'Student_Table'
    };
   
    // Calling DynamoDB to create the table
    db.createTable(params,(err:Error, data)=> {
      if (err) {
        console.log("Error", err);
      } else {
       
        console.log("Success", data);
        return ({status:true})
      }
    });
    }
 
 
 
// const CreateStudent=  (req:Request,res:Response)=>{
 
//     const {Student_id,Date,Name}=req.body
//     const data={
//          TableName:"Student_Table",
//          Item:{
//             Student_id:Student_id,
//             Date:Date,
//             Name:Name
//          }
//     }
//        dbClient.put(data,(err:Error,data)=>{
 
//         if(err) console.log(err)
//         res.send({status:true,data:data})
       
//      })
// }
 
const CreateStudent = async (req: Request, res: Response) => {
    try {
    const student=await dbClient.put({
            "TableName": "Student_Table",
            "Item": {
                "rollno": req.body.rollno,
                "Student_id": req.body.Student_id,
                "name": req.body.name      
            }
        }).promise();
 
        res.status(201).send({
            status: true,
            "message": "Students data created.",
            data:student
        })
    } catch (err:any) {
        res.status(500).send({
            "message": err.message
        })
    }
}
 
const getAllStudentData=(req:Request,res:Response)=>{
     const data={
        TableName:"Student_Table",
     }
     dbClient.scan(data,(err:Error,data)=>{
        if(err) console.log(err)
        res.send({status:true,msg:"data found",data:data})
     })
}
 
 
 
const getStudentById = async (req: Request, res: Response) => {
 
        const student = await dbClient.get({
            "TableName": "Student_Table",
            "Key": {
                "Student_id":req.params.Student_id
            }
        }).promise();
            res.status(200).send({status: true, message: "found data",data: student})
}
 
const upDatedStudentData=async (req:Request,res:Response) => {
           
  const params = {
    TableName: 'Student_Table',
    Key: {
      Student_id: req.params.Student_id
    },
    UpdateExpression: 'SET #rollno = :rollno, #name = :name',
    ExpressionAttributeNames: {
      '#rollno':'rollno',
      '#name': 'name'
     
    },
    ExpressionAttributeValues: {
      ':rollno':req.body.rollno,
      ':name': req.body.name
    }
  };
     await dbClient.update(params).promise()
     res.status(200).send({status:true,message:"data updated sucessfully"})
}
 
 
const deleteStudentDetail = async (req: Request, res: Response) => {
    try {
        const data = await dbClient.delete({
            "TableName": "Student_Table",
            "Key": {
                "Student_id": req.params.Student_id
            }
        }).promise();
 
        console.log(data);
        res.status(200).send({ status:true, "message":"deleted",data:data});
    } catch (err:any) {
        res.status(400).send({ "message": err.message })
    }
}
 
   

export{
    newTable,
    CreateStudent,
    getAllStudentData,
    getStudentById,
    upDatedStudentData,
    deleteStudentDetail
}

