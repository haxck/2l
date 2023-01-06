let mongoClient = require('mongodb').MongoClient
const { ConnectionPoolMonitoringEvent, Collection } = require('mongodb');
const config = require("./config.json")



let _db = null
async function connentDb(){
  if (!_db) {
    const client = new mongoClient(config.db.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      _db = await client.db(config.db.name);
    } catch (error) {
      throw "连接到数据库出错";
    }
  }
  return _db;
}

exports.getCollection = collection =>{
  let _col =null
  return async ()=>{
    if(!_col){
      try {
        console.log("get")
        const db = await connentDb();
        _col = await db.collection(collection)
      } catch (error) {
        console.log(error)
        throw "找不着collection";
      }
    }
    return _col;
  }
}

