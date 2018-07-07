var AWS = require('aws-sdk');
var dynamoClient = new AWS.DynamoDB.DocumentClient()

class Analysis{
  constructor(tableName){
    this.tableName = tableName;
  }
  getData(key){
    var params = {
      "TableName": this.tableName,
      Key: {
        key: key
      }
    }
    return new Promise( (resolve, reject) => {
      dynamoClient.get(params, (err, data) => {
        if(err){ 
          reject(err); 
        }
        resolve(data.Item.mapAttr);
      });
    });
  }
  updateData(key, data){
    var params = {
      TableName: this.tableName,
      Key:{
        "key": key 
      },
      UpdateExpression: "set mapAttr = :mapAttr",
      ExpressionAttributeValues:{
        ":mapAttr": data
      },
      ReturnValues:"UPDATED_NEW"
    }

    return new Promise( (resolve, reject) => {
      dynamoClient.update(params, (err, data) => {
        if(err){ 
          reject(err); 
        }
        resolve(data);
      });
    });

  }

}
exports.Analysis = Analysis;

