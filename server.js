const express = require("express")
const connectDB = require("./config/db")
const { PORT } = require("./config/env")

const app = express()
const port = PORT

connectDB()

app.use(express.json())

app.get('/',(req,res) => {
    res.send('API is running')
})

app.listen(port, () => {
    console.log("Server running")
})