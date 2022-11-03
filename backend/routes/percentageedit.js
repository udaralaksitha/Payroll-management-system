const express = require('express');
const Empsalaryper = require('../models/percentageedit');

const router = express.Router();

//save posts

router.post('/empsalaryper/save',(req,res)=>{

    let newEmpsalaryper = new Empsalaryper(req.body);

    newEmpsalaryper.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Employee salary percentage details saved successfully"
        });
    });

});

//get posts

router.get('/empsalaryper',(req,res) =>{
    Empsalaryper.find().exec((err,empsalaryper) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEmpsalaryper:empsalaryper
        });
    });
});



//update posts

router.put('/empsalaryper/update/:id',(req,res) =>{
    Empsalaryper.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,empsalaryper)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }

    );
});

module.exports = router;