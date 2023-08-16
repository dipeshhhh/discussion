const express = require('express');
const router = express.Router();
require('../DB/conn');
const bcyrpt = require('bcryptjs');
const Users = require('../DB/module');
const Otp = require('../DB/Otp')
const Groupdivision = require('../DB/Group')
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');

//Signup Page query


router.post('/SendOtp', async(req,res)=>{
   
   
    const data = await Users.findOne({email:req.body.email}) 
    
   
    if(data)
    {
        return res.status(422).json({err:'Email already Exist'})
    }
    else
    {
        let otpcode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn:new Date().getTime()+300*1000
        })

        let otpResponse = await otpData.save()
        if(otpResponse)
        {
            return res.status(200).json('otp send to you email ID')
        }
    }


})


router.post('/VerifyOtp', async(req,res)=>{
    let data = await Otp.findOne({email:req.body.email,code:req.body.otpcode})
   
    if(data)
    {
        let currentTime = new Date()
       
       res.send(currentTime)
        // if(diff<0)
        // {
        //     return res.status(422).json({err:'Otp Expired'})
        // }
        // else
        // {
        //     return res.status(200).json(req.body.email)            
        // }

    }
    else
    {
        return res.status(422).json({err:'Invalid Otp'})

    }
})

router.post('/Signup', async (req,res)=>{

   let {name, email, Divisionid, Smdid, password,status, intrested} = req.body;   
   try{
      
    const userExist = await Users.findOne({email:email})
    if(!userExist)
    {
        let Group=[]

        const login =0
       
       
       const data =await Groupdivision.find({division:Divisionid},{_id:1})
       
    for(var i=0;i<data.length;i++)
    {
        Group.push(data[i]._id)
    
    }
       const fetch = new Users({name, email, Divisionid, Group, Smdid, password,status, login, intrested});
       const result = await fetch.save()
       if(result)
        {
        res.status(201).json({message: 'inserted'})
        }
        
        
    }
    else{
        return res.status(422).json({err:'Email already Exist'})
    }
      
    }
    catch(err){
    console.log(err);
    }
        }) 

//Signin Page Query
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(422).json({ eror: 'something missing' })
        }

        const userExist = await Users.findOne({ email: email })


        
        if (userExist) {
            const verified = await bcyrpt.compare(password, userExist.password);

            if(userExist.status === 0)
            {
                return res.status(402).json({ err: 'User is not Activated' }) 
            }
            else if (userExist.status > 2)
            {
                return res.status(402).json({ err: 'Wrong Credentails' })
            } 
            
            else if (verified) {          

                    return res.status(200).json({userExist})
                            
                

            }
            else {
                return res.status(402).json({ err: 'wrong credentail' })
            }
        }
        else {
            return res.status(402).json({ err: 'wrong credentail' })
        }

    }
    catch (err) {
        console.log(err);
    }
}
)

router.post('/SignAdmin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(422).json({ eror: 'something missing' })
        }

        const userExist = await Users.findOne({ email: email })
        
        if (userExist) {
            const verified = await bcyrpt.compare(password, userExist.password);

            if(userExist.status < 2)
            {
                return res.status(402).json({ err: 'Wrong Credentails' }) 
            }
            
            else if (verified) {
                
                return res.status(200).json({userExist})

            }
            else {
                return res.status(402).json({ err: 'wrong credentail' })
            }
        }
        else {
            return res.status(402).json({ err: 'wrong credentail' })
        }

    }
    catch (err) {
        console.log(err);
    }
}
)


//User Details fetch 
router.get('/user-detail/:id',(req,res)=>{

    Users.findOne({email:req.params.id},{name:1, email:1, Divisionid:1,status:1}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
       res.status(400).send(e)
    })
})

router.post('/unauthenticate',(req,res)=>{
    Users.find({status:0},{email:1,name:1,Smdid:1,Divisionid:1}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
       res.status(400).send(e)
    })
})

router.post('/authenticate',(req,res)=>{
    Users.find({status:1},{email:1,name:1,Smdid:1,Divisionid:1}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
       res.status(400).send(e)
    })
})


router.get('/approve/:id',(req,res)=>{

    const id = new ObjectId(req.params.id)

    Users.updateOne({_id:id},{$set:{status:1}}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
       res.status(400).send(e)
    })

})

router.get('/disapprove/:id',(req,res)=>{
    const id = new ObjectId(req.params.id)
    Users.deleteOne({_id:id}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
       res.status(400).send(e)
    })
})

//Get Member of a Specific Subject

router.get('/Member',(req,res)=>{
    
   
       Users.find({$and: [{Divisionid:req.query.id_1},{email:{$ne:req.query.id_2}}]} ,{_id:0,email:1,name:1}).then((resp)=>{
        
        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
     })
})

module.exports = router;
