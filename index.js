const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongodb = require('./config/mongodb')
const {checkout} = require('./controller/checkout')
const { createProduct } = require('./controller/product')
const { register } = require('./controller/user')
const auth = require('./middleware/auth')
mongodb()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res)=>{
    res.status(200).json({
        "message" : "server us running good",
        "serverTime" : Date.now()
    })
})

app.post("/product", createProduct)
app.post("/register", register)
app.get("/checkout/:id", auth, checkout)
app.post("/transaction/callback", (req, res)=>{
    console.log(req.body)
    res.sendStatus(200)
})
app.listen(port, ()=>console.log("Server is running on port", port))