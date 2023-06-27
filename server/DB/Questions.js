const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    title:String,
    body:String,
    auth:String,
    created_at:{
        type:Date,
        //default:Date.now()
    },
    file:String,
    group:String
    
})

module.exports = mongoose.model('Questions',QuestionSchema)