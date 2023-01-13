const lovewords = require('../mongoDB').getCollection("lovewords")
const { ObjectId } = require("mongodb");
exports.random = async (size) => {
  console.log(size)
  try {
    const col = await lovewords()
    return col.aggregate([{ $sample: { size: parseInt(size) } }]).toArray();
  } catch (error) {
    throw "查询失败"
  }
}

exports.findOne = async (id) => {
  try {
    const col = await lovewords()
    return col.find({ _id: ObjectId(id) }).toArray();
  } catch (error) {
    throw "查询失败"
  }
}

exports.like = async (id) => {
  try {
    const col = await lovewords();
    const result = await col.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $inc: {
          "likeCount": 1
        }
      },
      { returnOriginal: false }
    );
    return result.value;
  } catch (error) {
    throw "喜欢失败";
  }
};

exports.dislike = async (id) => {
  try {
    const col = await lovewords();
    const result = await col.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $inc: {
          "likeCount": -1
        }
      },
      { returnOriginal: false }
    );
    return result.value;
  } catch (error) {
    throw "取消喜欢失败";
  }
};
