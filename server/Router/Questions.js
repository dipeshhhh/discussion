const express = require('express');
const router = express.Router();
require('../DB/conn');
const Question = require('../DB/Questions')

router.post('/Question', async(req,res)=>{
    const {title, body, post_at, file} = req.body;
    const u_id = sessionStorage.getItem('username')
    try{
        const data = new Question({u_id, title, body, post_at, file});
        const result = await data.save()

        if(result)
        {
            console.log(result)
        res.status(201).json({message: 'inserted'})
        }
        else{
        console.log('error')
        return res.status(402).json({ err: 'not inserted' }) 
        }
    }
    catch{
        console.log(err);
    }
})

module.exports = router;

