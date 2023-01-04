import * as AWS from 'aws-sdk';

// Set the region
AWS.config.update({
    region: 'ap-northeast-1',
    accessKeyId: 'AKIAXMHN3LOMUG4XE3H4',
    secretAccessKey: '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',
  });
  
  
// Create the DynamoDB service object
// const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const db=new AWS.DynamoDB();
const newTable=():void=>{
const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'Studentid',
      AttributeType: 'S'
    }

  ],
  KeySchema: [
    {
      AttributeName: 'Studentid',
      KeyType: 'HASH'
    }
   
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'TABLE_NAME',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
db.createTable(params,(err:Error, data)=> {
  if (err) {
    console.log("Error", err);
  } else {
    
    console.log("Success", data);
    return ({status:true})
  }
});
}

export{
    newTable
}

