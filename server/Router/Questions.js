const express = require('express');
const router = express.Router();
require('../DB/conn');
const Question = require('../DB/Questions')
const multer  = require('multer')

const storage = multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,'../Uploads/')
        },
        filename:function(req,file,cb)
        {
            cb(null, file.fieldname+Date.now().toString()+'.pdf')
        }
    })

var upload = multer({storage:storage})

router.post('/Question', upload.single('file'), async(req,res)=>{
    console.log({title, body,auth} = req.body)  
    
    // try{   
    //     const data = new Question({auth, title, body, file});
    //     const result = await data.save()

    //     if(result)
    //     {
    //         console.log(result)
    //     res.status(201).json({message: 'inserted'})
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

