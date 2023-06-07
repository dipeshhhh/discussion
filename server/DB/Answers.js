const mongoose = require('mongoose')
const AnswerSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },   
    reply:String,
    auth:String,
    group:String,
    created_at:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Answers',AnswerSchema)