const express = require('express');
const router = express.Router();
require('../DB/conn');
const Answer = require('../DB/Answers')
const multer  = require('multer')
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb')


const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'./Uploads/answers')
    },
    filename:function(req,file,cb)
    {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

var upload = multer({storage:storage}).single('file')

router.post('/Answer', upload,async(req,res)=>{

    const { question_id, body, auth, file } = req.body;

    const created_at = new Date();
       
    if(req.file)
    {
        const file = req.file.path 

        try{   
            const data = new Answer({question_id,body,auth,file,created_at});
            const result = await data.save()
    
            if(result)
            {              
            res.status(200).json({message: 'inserted'})
            }
            else{
            console.log('error')
            return res.status(402).json({ err: 'not inserted' }) 
            }
        }
        catch (err){
            console.log(err);
        }

    }
    else{     
        
        try{   
            const data = new Answer({question_id,body,auth,created_at});
            const result = await data.save()    
            if(result)
            {                
            res.status(200).json({message: 'inserted'})
            }
            else{
            console.log('error')
            return res.status(402).json({ err: 'not inserted' }) 
            }
        }
        catch (err){
            console.log(err);
        }
        


    }

   
})

/****************Fetch Answer from Answer collection************************/
router.get('/Answer-detail/:id',(req,res)=>{

    const id = new ObjectId(req.params.id) 

    Answer.find({question_id:id},{question_id:0}).then((resp)=>{
            res.status(200).send(resp)
    }).catch((err)=>{
        res.status(400).send(e)
    })
})
/*****************************************************************************/

/***********************Download the attachment from Answer Collection****************************/

router.get('/A_download/:id',(req,res)=>{

    const id = new ObjectId(req.params.id)

    Answer.findOne({_id:id},{_id:0,file:1}).then((response)=>{
        return res.download(response.file)
    })
    .catch((e) => {
        console.log("Error:", e)
        res.status(400).send(e)
    })
})



/******************************************************************************/

module.exports = router;