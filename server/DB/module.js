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
    Smdid:{
        type:String,
        required:true
    },
    Divisionid:{
        type:String,
        required:true
    },
    Group:[String],
    intrested:[String],
    password:{
        type:String,
        required:true
    },
    login:{
        type:Number,
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