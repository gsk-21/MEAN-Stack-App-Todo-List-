var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()

const DATABASE_URL = 'mongodb://localhost:27017/todoList'
const PORT = 3000

var route = require('./route/routes')

mongoose.connect(DATABASE_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true
     })

mongoose.connection.on('connected',()=>{
    console.log("--- CONNECTION TO THE DATABASE IS SUCCESS ---");
})

mongoose.connection.on('error',(err)=>{
    console.log("\n\nError in DB");
    console.log(err);
})


app.use(cors())

app.use(bodyParser.json())

app.use('/api',route)



app.listen(PORT,()=>{
    console.log("-- APP IS RUNNING ON THE PORT:"+PORT+' --');
})

app.get('/',(req,res)=>{
    res.send("SAIRAM!")
})
