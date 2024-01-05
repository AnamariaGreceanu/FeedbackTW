const express = require('express')
const router = require("./routes")
const cors = require("cors")
const authenticateToken=require("./middlewares/auth")

const app=express()
const port=8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})

app.use("/api",authenticateToken,router)

