var Analysis = require('./analysis.js').Analysis;
var ana = new Analysis("smartHacksMagazineAnalysis");

exports.putHandler = async function(handler){
  var data = await ana.getData("handlerCount");
  if(!data[handler]){
    data[handler] = 1;
  }else{
    data[handler] += 1;
  }
  await ana.updateData("handlerCount", data);
};
