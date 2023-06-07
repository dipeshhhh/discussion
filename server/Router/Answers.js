const express = require('express');
const router = express.Router();

require('../DB/conn');

const Answer = require('../DB/Answers')
// const multer  = require('multer')

// const storage = multer.diskStorage({
//     destination:function(req,file,cb)
//     {
//         cb(null,'./Uploads')
//     },
//     filename:function(req,file,cb)
//     {
//         cb(null, Date.now() + '-' +file.originalname)
//     }
// })

// var upload = multer({storage:storage}).single('file')

router.post('/Answer', async(req,res)=>{
       
    console.log(req.body)

    const { question_id, reply, auth, group } = req.body;

    console.log(req.body)

    try{
        const data = new Answer({question_id,reply,auth,group})
          
        const result = await data.save().then((doc)=>{
            res.status(201).send({
                status:true,
                data:doc
            })
        }).catch((err)=>{
            res.status(400).send({
                status:false,
                message:'Error while adding answer'
            })
        }) 
                
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router;