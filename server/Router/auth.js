const express = require('express');
const router = express.Router();
require('../DB/conn');
const bcyrpt = require('bcryptjs');
const Users = require('../DB/module');
const Otp = require('../DB/Otp')
const Division = require('../DB/Division')
const Institute = require('../DB/Institutes')
const SmdDivision = require('../DB/SMDDivision')
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
        let otpcode = Math.random().toString(36).substring(2,7)
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

router.post('/Resotp',async(req,res)=>{

    const data = await Otp.findOne({email:req.body.email},{_id:0,expireIn:1}) 
  
    const currentTime = new Date().getTime()

    const diff = data.expireIn - currentTime

    if(diff<0)
    {
        let otpcode = Math.random().toString(36).substring(2,7)

        Otp.updateOne({email:req.body.email},{code:otpcode,expireIn:new Date().getTime()+300*1000}).then((resp)=>{

            return res.status(200).json('otp send to you email ID')
            
        })       

    }
    else
    {
        return res.status(422).json({err:'Wait for 6 Minute to Resend OTP'})

    }


})

router.post('/VerifyOtp', async(req,res)=>{
    const data = await Otp.findOne({email:req.body.email,code:req.body.otp})
   
    if(data)
    {
       
        let currentTime = new Date().getTime()      
      
        const diff = data.expireIn - currentTime
       
        if(diff<0)
        {
            return res.status(422).json({err:'Otp Expired'})
        }
        else
        {
            return res.status(200).json(req.body.email)            
        }

    }
    else
    {
        return res.status(422).json({err:'Invalid Otp'})

    }
})

/************************Signup API*************************/
router.post('/Signup', async (req,res)=>{

    let {name, email, Divisionid, Smdid, password,status, intrested,institute,Hqrs} = req.body;  
   
    try{
       
     const userExist = await Users.findOne({email:email})
     if(!userExist)
     {        

        const fetch = new Users({name, email, Divisionid, Smdid, password,status, intrested,Hqrs,institute});
        const result = await fetch.save()
        Division.updateMany({$or:[{_id:intrested},{_id:Divisionid}]},{$push:{member:email}}).then((resp)=>{

            if(Hqrs == 1)
            {         
                
               Institute.updateOne({_id:institute},{$push:{member:email}}).then((resp)=>{
                 res.status(201).json({message: 'inserted'})
              })
    
            }
            else if(Hqrs == 2)
            {
                SmdDivision.updateOne({_id:Smdid},{$push:{member:email}}).then((resp)=>{
                    res.status(201).json({message: 'inserted'})
                })      
                
                
            } 

        })
        
       
         
     }
     else{
         return res.status(422).json({err:'Email already Exist'})
     }
       
     }
     catch(err){
     console.log(err);
     }
         })
/***********************************************************************/


/***************************SIGNIN API*******************************************/

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
            else if (userExist.status > 3)
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

/***********************************************************************************/

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

    Users.findOne({email:req.params.id},{status:1, starred:1,Smdid:1,Divisionid:1,institute:1,intrested:1,Hqrs:1}).then((resp)=>{
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

router.get('/Member',(req,res)=>{
    
   
    Users.find({$and: [{Divisionid:req.query.id_1},{email:{$ne:req.query.id_2}}]} ,{_id:0,email:1,name:1}).then((resp)=>{
     
     res.status(200).send(resp)
 }).catch((e)=>{
     res.status(400).send(e)
  })
})

router.get('/main_G/:id',(req,res)=>{   
   
    Users.findOne({email:req.params.id},{_id:0,Divisionid:1,status:1,Smdid:1,Hqrs:1,institute:1}).then((resp)=>{     
     res.status(200).send(resp)
 }).catch((e)=>{
     res.status(400).send(e)
  })
})


module.exports = router;
