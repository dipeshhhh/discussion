const express = require('express');
const router = express.Router();
require('../DB/conn');
const Question = require('../DB/Questions')
const User = require('../DB/module')
const multer  = require('multer');
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');
var fs = require('fs');


const storage = multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,'./Uploads/questions')
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
                    localField:'Group',
                    foreignField:'group',
                    as:'result'
                }
            },
            {
                $match:{email:email}
            },             
           
        ])
        .exec()
        .then((resp)=>{
           
               return res.status(200).send(resp)
              
            })
            .catch((e)=>{
                console.log("Error:", e)
                res.status(400).send(e)
            })    
             
    
})

router.get('/Question-detail/:id', (req, res) => {


    const id = new ObjectId(req.params.id)


    Question.aggregate([
        {
            $match: { _id: id },
        },
        {
            $lookup: {
                from: 'answers',
                localField: '_id',
                foreignField: 'question_id',
                as: 'result'
            }
        }

    ]).exec()
        .then((resp) => {

            return res.status(200).send(resp)

        })
        .catch((e) => {
            console.log("Error:", e)
            res.status(400).send(e)
        })
})


router.get('/deletepost/:id', (req, res) => {


    const id = new ObjectId(req.params.id)


    Question.findOne({_id:id},{_id:0,file:1})
        .then((resp) => {
           
           fs.unlinkSync(resp.file)

           Question.deleteOne({_id:id}).then((response)=>{
                return res.status(200).send(response)
           })     
        })
        .catch((e) => {
            console.log("Error:", e)
            res.status(400).send(e)
        })
})

router.get('/Q_download/:id',(req,resp)=>{

    const id = new ObjectId(req.params.id)

    Question.findOne({_id:id},{_id:0,file:1}).then((response)=>{

        return resp.download(response.file)
    })
    .catch((e) => {
        console.log("Error:", e)
        resp.status(400).send(e)
    })
})

module.exports = router;

