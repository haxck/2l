const mongoose = require('mongoose')

const connect = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    throw new Error("Connection failed!",error)
  }
}

export default connect