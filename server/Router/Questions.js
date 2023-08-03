const express = require('express');
const router = express.Router();
require('../DB/conn');
const Question = require('../DB/Questions')
const User = require('../DB/module')
const multer  = require('multer');
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');
var fs = require('fs');
const crone = require('node-cron');
const { type } = require('os');


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
 
    // console.log(req.body,req.file)
   
    const { title, body, auth, subject,Members} = req.body;
      
    const created_at = new Date();   
   
    const member = Members.split(',')

    
 /* for upload the file     
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

    if(req.file)
    {
        const file = req.file.path 

        try{   
            const data = new Question({auth, title, body, file, subject,created_at,member});
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

    else
    {

        try{   
            const data = new Question({auth, title, body, subject,created_at,member});
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

router.get('/Question/:id', async(req,res)=>{


        let email = req.params.id
       
        
        User.aggregate([
            {
                $lookup: {
                    from:'questions',
                    localField:'Divisionid',
                    foreignField:'subject',
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


router.get('/subject_question/:id',(req,res)=>{
       
    Question.find({member:req.params.id}).then((resp)=>{
        return res.status(200).send(resp)
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


router.get('/group-question/:id', (req,res)=>{
   

    Question.find({group:req.params.id})
        .then((resp)=>{
            return res.status(200).send(resp)
        })
        .catch((e) => {
            console.log("Error:", e)
            res.status(400).send(e)
        })
})

router.get('/get_Question/:id',(req,res)=>{
   
    const id = new ObjectId(req.params.id)

    Question.find({_id:id}).then((resp)=>{
        return res.status(200).send(resp)
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



/************************Delete Question Thread After 30 days if no activity in Post************************************/
// crone.schedule('1 * * * *', ()=>{
    
// })

const getdata = async ()=>{   

    
    
    Question.find({},{created_at:1, file:1}).then((resp)=>{

         const time =new Date()
    
         let time_diff = []
         let day_diff = []
         let day_id =[]        
         let file =[]

       for(i=0;i<resp.length;i++)
       {
            time_diff = time.getTime() - resp[i].created_at.getTime()
            
            day_diff.push(Math.ceil(time_diff/(1000 * 60 * 60 * 24)))   
            
            if(day_diff[i]>5)
         {               
            day_id.push(resp[i]._id)

            file.push(resp[i].file)
         }           
       }   
       
       for(z=0;z<day_id.length;z++)
       {
        if(file[z])
        {
            fs.unlinkSync(file[z])

            Question.deleteMany({_id:day_id[z]}).then(()=>{
                console.log('file has been deleted')
              })
              .catch((e)=>{
                console.log(e)
              })
        }

        else
        {
            Question.deleteMany({_id:day_id[z]}).then(()=>{
                console.log('file has been deleted')
              })
              .catch((e)=>{
                console.log(e)
              })

        }       
       }   
       
    }) 
   
    
    
} 

getdata()  
   
/*************************************************************************/
   









module.exports = router;

