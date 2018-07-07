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
        if(data.Item){
          resolve(data.Item.mapAttr);
        }else{
          resolve(data);
        }
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

  async putHandler(handler){
    var data = await this.getData("handlerCount");
    if(!data[handler]){
      data[handler] = 1;
    }else{
      data[handler] += 1;
    }
    await this.updateData("handlerCount", data);
  };
}
exports.Analysis = Analysis;

