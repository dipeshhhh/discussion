const mongoose = require('mongoose')
const AnswerSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    },
    answer:String,
    user:Object,
    created_at:{
        type:Date,
        default:Date.now()
    },
    file:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Answer',AnswerSchema)