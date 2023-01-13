const express = require("express")
const app = express()
const config = require("./config.json")
const lovewords = require('./models/lovewords')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5501');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


app.use(express.json())

app.get("/:id?", async (req, res) => {
  console.log(req.params.id);
  if (!req.params.id) {
    try {
      const words = await lovewords.random(1)
      res.json(words);
    } catch (error) {
      console.log(error)
      res.status(404).send()
    }
  }
  try {
    const words = await lovewords.findOne(req.params.id)
    res.json(words);
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }

})

app.get("/m/:c?", async (req, res) => {
  let size
  if (!req.params.c) {
    size = 1
  } else {
    size = parseInt(req.params.c)
  }
  try {
    const words = await lovewords.random(size > 5 ? 5 : 1)
    res.json(words);
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})
app.post("/like", async (req, res) => {
  try {
    const words = await lovewords.like(req.body.id)
    res.json(words);
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})
app.post("/unlike", async (req, res) => {
  try {
    const words = await lovewords.dislike(req.body.id)
    res.json(words);
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})

app.listen(config.port, () => {
  console.log("api is running")
})