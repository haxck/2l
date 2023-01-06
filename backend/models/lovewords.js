const lovewords = require('../mongoDB').getCollection("lovewords")

exports.findAll = async () =>{
  try {
    const col = await lovewords()
    return col.aggregate( [ { $sample: { size: 1 } } ] ).toArray();
  } catch (error) {
    throw "查询失败"
  }
}