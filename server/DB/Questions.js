const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    title:String,
    body:String,
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

module.exports = mongoose.model('Questions',QuestionSchema)