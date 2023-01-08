import express,{Request,Response,Application} from "express";
 
const PORT:Number=5000;
 
const app:Application=express()
 
app.get("/test",(req:Request,res:Response)=>{
    res.send("hello world")
})
 
import * as AWS from 'aws-sdk';
 
AWS.config.update({
    region: "ap-northeast-1",
    accessKeyId: "AKIAXMHN3LOMUG4XE3H4",
    secretAccessKey: "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"
 
})
 
const sns = new AWS.SNS();
const sqs = new AWS.SQS();
 
app.get("/createTopic",(req:Request,res:Response)=>{
    var params = {
        Name: "myNewTopic"
    };
 
    sns.createTopic(params,(err:Error, data)=> {
        if(err) { console.log(err);
 
        }
          else{
            const TopicArn=data.TopicArn
            res.status(201).send({status:true,message:"created",TopicArn:TopicArn})
          }
 
    });
})
 
 
// app.get('/createQueue',(req:Request, res:Response)=> {
//     var data = {
//         QueueName: "MyFirstQueue"
//     };
 
//     sqs.createQueue(data, function(err:Error, data) {
//         if(err) { console.log(err);
 
//         }
//           else{
//             const QueueUrl=data.QueueUrl
             
//             res.status(201).send({status:true,message:"queue created sucessfully",QueueUrl:QueueUrl})
//           }
       
//     });
//   });
 
app.get("/createQue",async()=>{
    const params = {
        QueueName: "myFirstQue"
    }
 
    const response = await sqs.createQueue(params).promise()
 
    console.log("create queue response ", response)
 
    const arnParams:any = {
        QueueUrl: response.QueueUrl,
        AttributeNames: ['QueueArn']
    }
 
    const arnResponse = await sqs.getQueueAttributes(arnParams).promise()
 
    console.log("ARN ", arnResponse)
 
    const policy = {
        "Version": "2012-10-17",
        "Id": "myFirstQue",
        "Statement":
          {
             "Sid": "myFirstQue",
             "Effect": "Allow",
             "Principal": "*",
             "Action": ["sqs:SendMessage", "sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"],
             "Resource": arnResponse?.Attributes?.QueueArn
          }
    }
  
    await sqs.setQueueAttributes({
        QueueUrl: response?.QueueUrl,
        Attributes: {
          Policy: JSON.stringify(policy)
        }
    } as any).promise()
 
    return response
})
 
 
 
 
 
 
 
app.get("/subscribeToSN",(req:Request,res:Response)=>{
    // var QueueUrl ='https://sqs.ap-northeast-1.amazonaws.com/507304958873/MyFirstQueue';
const data = {
  Protocol: 'sqs',
  TopicArn: 'arn:aws:sns:ap-northeast-1:507304958873:myNewTopic',
  Endpoint: 'arn:aws:sqs:ap-northeast-1:507304958873:myFirstQue'
};
 
sns.subscribe(data, (err, data) => {
  if (err) {
    console.error(err);
  } else{
     res.status(200).send({status:true,message:"sucessfully subscribed",data:data})
  }
})
})

app.get('/message',(req:Request,res:Response)=>{
      const data={
        Message:"hello how are you",
         TopicArn:"arn:aws:sns:ap-northeast-1:507304958873:myNewTopic"
      }
    sns.publish(data,(err:Error,data)=>{
        if(err) console.log(err)
         res.status(200).send({status:true,message:"message send sucessfully",data:data})
    })
})




 
 
 
 
app.listen(PORT,():void=>{
      console.log("server is running on"+" "+PORT)
})
