const express = require('express');
const router = express.Router();
require('../DB/conn');
const SmdDivision = require('../DB/SMDDivision')
const Group = require('../DB/Group')
const Division = require('../DB/Division')
const User = require('../DB/module')
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb')



//Smd Details fetch
router.get('/smddetail', (req,res)=>{

    SmdDivision.find({},{name:1}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})



//Dvision details fetch
router.get('/smddetail/:name', (req,res)=>{

    // SmdDivision.findOne({name:req.params.name}).then((resp)=>{

    //         console.log(resp)
    //        res.status(200).send(resp)
           
    //     })  
        

    SmdDivision.find({name:req.params.name},{_id:0, division:1}).limit(1).then((resp)=>{

        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/Group', (req,res)=>{

    SmdDivision.find({},{name:1}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/groupdetail/:name',(req,res)=>{

    Group.findOne({name:req.params.name},{_id:0,division:1}).then((resp)=>{

               
        Division.find({_id:resp.division}).then((resp)=>{
            res.send(resp)
        })

    })

})


router.get('/SMD',(req,res)=>{
    SmdDivision.find({}).then((resp)=>{
        res.status(200).send(resp)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//Group detail fetch from user collection
router.get('/group/:id',(req,res)=>{
       
    User.find({email:req.params.id},{_id:0,Divisionid:1,status:1,intrested:1,Smdid:1})
     .then((resp)=>{       
       
            resp.map((rsp)=>{              
                             
                //                   Group.find({_id:rsp.Group},{name:1})
                //    .then((grsp)=>{
                          res.send(rsp)
                //    })
       })
       
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/main_group/:id',(req,res)=>{
        User.find({email:req.params.id},{_id:0,Group:1})
        .then((resp)=>{
            resp.map((rsp)=>{
                
                SmdDivision.find({_id:rsp.Group},{name:1})
                   .then((grsp)=>{
                          res.send(grsp)
                    })

            })
        })
})

module.exports = router;