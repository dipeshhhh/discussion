const express = require('express');
const router = express.Router();
require('../DB/conn');

const Question = require('../DB/Questions')
const User = require('../DB/module')
const multer  = require('multer');
const { default: mongoose } = require('mongoose');

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
   
    const { title, body, auth, group } = req.body;
     
    const file = req.file.path
    
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
   
    

  
    try{   
        const data = new Question({auth, title, body, file, group});
        const result = await data.save()

        if(result)
        {
            console.log(result)
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
})

router.get('/Question/:id', async(req,res)=>{


        let email = req.params.id
       
        
        User.aggregate([
            {
                $lookup: {
                    from:'questions',
                    localField:'division',
                    foreignField:'group',
                    as:'result'
                }
            },
            {
                $match:{email:email}
            }
           
        ])
        .then((resp)=>{
           
               return res.status(200).json({status:'success', data:resp})
              
            })
            .catch((e)=>{
                console.log("Error:", e)
                res.status(400).send(e)
            })    
             
    
})

// router.get('/Question/:id', async(req,res)=>{
//     try{

//         QuestionDB.aggregate([
//             {
//                 $match:{_id: mongoose.Types.ObjectId(req.params.id)},
//             },
//             {
            
//                 $lookup:{
//                     from: "answers",
//                     let: { question_id:"$_id"},
//                     pipline:[
//                         {
//                             $match:{
//                                 $expr: {
//                                     $eq:['$question_id','$$question_id'],
//                                 },
//                             },
//                         },
//                         {
//                             $project:{
//                                 _id:1,
//                                 auth:1,
//                                 reply:1,
//                                 question_id:1,
//                                 created_at:1,
//                                 file:1
//                             },
//                         },
//                     ],
//                     as:"answerDetails",
//                 },
//             }, 
//             {
//                 $project: {
//                     _v:0,
//                 },
//             },
//         ])
//         .exec()
//     .then((questionDetails)=>{
//         res.send(200).send(questionDetails)
//     })
//     .catch((e)=>{
//         console.log("Error:", e)
//         res.status(400).send(e)
//     })        

//     }
//     catch(err)
//     {

//     }
// })

module.exports = router;

