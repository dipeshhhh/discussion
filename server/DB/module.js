const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    division:[String],
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    }
    });

Userschema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password = await bcyrpt.hash(this.password, 10);
    }
    next();
})



module.exports = mongoose.model('users',Userschema)