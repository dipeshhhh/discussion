const express = require('express');
const router = express.Router();
require('../DB/conn');
const bcyrpt = require('bcryptjs');
const Users = require('../DB/module');


// using of promise
/*router.post('/Signup', (req,res)=>{
    const {name, email, password} = req.body;
    if (!name || !email || !password)
    {
        return res.status(422).json({eror:'something missing'})
    }
    Users.findOne({email:email}).then((userExist)=>{
        if(userExist)
        {
            return res.status(422).json({err:'Email already Exist'})
        }
        const data = new Users({name, email, password});
        const result = data.save().then(()=>{
            res.status(201).json({message: 'inserted'})
        }).catch((err)=>{
            res.status(500).json({err: 'Failed inserted'})
        })
    }).catch((err)=>{
        console.log(err)
    })
}); */

// using of await


router.post('/Signup', async (req,res)=>{
    const {name, email, division, password} = req.body;
        
    try{
    const userExist = await Users.findOne({email:email})
    if(userExist)
    {
        return res.status(422).json({err:'Email already Exist'})
    }
    
    const data = new Users({name, email, division, password});
    const result = await data.save()
    if(result)
    {
        res.status(201).json({message: 'inserted'})
    }
}
catch(err){
    console.log(err);
}
}) 

router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(422).json({ eror: 'something missing' })
        }

        const userExist = await Users.findOne({ email: email })

        if (userExist) {
            const verified = await bcyrpt.compare(password, userExist.password);

            if (verified) {
                
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





module.exports = router;
