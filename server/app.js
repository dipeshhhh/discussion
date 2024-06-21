const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
require('./DB/conn');
const Users = require('./DB/module');
const app = express();
const connectDb = require('./DB/conn.js')
const PORT = process.env.PORT || 8000;

// Link the router file
app.use(express.json())
app.use(require('./Router/auth'))
app.use(require('./Router/Questions'))
app.use(require('./Router/Answers'))
app.use(require('./Router/Group'))

connectDb()
app.listen(PORT, ()=>{
        console.log(`server running on port no. ${PORT}`)
})