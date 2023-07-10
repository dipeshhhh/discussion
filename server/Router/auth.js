const express = require('express');
const router = express.Router();
require('../DB/conn');
const bcyrpt = require('bcryptjs');
const Users = require('../DB/module');
const Groupdivision = require('../DB/Group')

//Signup Page query


router.post('/Signup', async (req,res)=>{

   let {name, email, Divisionid, Smdid, password,status} = req.body;
    

    try{
      
    const userExist = await Users.findOne({email:email})
    if(!userExist)
    {
        let Group=[]
       
       
       const data =await Groupdivision.find({division:Divisionid},{_id:1})
       
    for(var i=0;i<data.length;i++)
    {
        Group.push(data[i]._id)
    
    }

       const fetch = new Users({name, email, Divisionid, Group, Smdid, password,status});
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

//Get Member of a Specific Subject

router.get('/Member/:id',(req,res)=>{

    
    Users.find({Divisionid:req.params.id},{_id:0,email:1,name:1}).then((resp)=>{
        
        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
     })
})

module.exports = router;
