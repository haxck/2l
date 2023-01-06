// const cc = require('./mongoDB').getCollection("lovewords")


// const col =await cc();
// const reslut = col.find({}).toArray()
// console.log(reslut)


const express = require("express")
const app = express()
const config = require("./config.json")
const lovewords =require('./models/lovewords')

app.use(express.json())

app.get("/",(req,res)=>{
  res.send("hello");
})

app.get("/test",async (req,res)=>{
  try {
    const words = await lovewords.findAll()
    res.json(words);
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})

app.listen(config.port,()=>{
  console.log("api is running")
})