const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

Userschema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password = await bcyrpt.hash(this.password, 10);
    }
    next();
})
// Here we make Json Web Token and return for auth
Userschema.methods.generateAuthToken = async function(){
    try{
        let token= jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
        }
    catch (err)
    {
        console.log(err)
    }
}

module.exports = mongoose.model('users',Userschema)