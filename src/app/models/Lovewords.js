import mongoose from "mongoose";

const {Schema} = mongoose

const lovewords = new Schema({
  type:{
    type: String
  },
  sentent: {
    type: String
  },
  likeCount: {
    type: Number
  }
})

module.exports = mongoose.models['lovewords'] || mongoose.model('lovewords', lovewords)
