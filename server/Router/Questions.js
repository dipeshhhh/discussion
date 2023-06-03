const express = require('express');
const router = express.Router();
require('../DB/conn');

const Question = require('../DB/Questions')
const multer  = require('multer')

const storage = multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,'./Uploads')
        },
        filename:function(req,file,cb)
        {
            cb(null, Date.now() + '-' +file.originalname)
        }
    })

var upload = multer({storage:storage}).single('file')

router.post('/Question', upload,async(req,res)=>{
 
     console.log(req.body,req.file)
   
   // const document = './'+req.file.path
    
 /*     
    upload(req,res, function(err)
    {
        if (err) {
            return res.status(500).json(err)
        } 

        return res.status(200).send(req.file)
       
    }
    )

    This code for Check file uploaded or not
    */    
   
    

  
    // try{   
    //     const data = new Question({auth, title, body, document});
    //     const result = await data.save()

    //     if(result)
    //     {
    //         console.log(result)
    //     res.status(200).json({message: 'inserted'})
    //     }
    //     else{
    //     console.log('error')
    //     return res.status(402).json({ err: 'not inserted' }) 
    //     }
    // }
    // catch (err){
    //     console.log(err);
    // }
})

module.exports = router;

