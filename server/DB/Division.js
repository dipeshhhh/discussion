const mongoose = require('mongoose')
const Divsion = new mongoose.Schema({
    name:String,
    Member:[String],
    
})

module.exports = mongoose.model('Division',Divsion)