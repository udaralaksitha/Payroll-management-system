const express = require('express');
const AddiEmpsalary = require('../models/Addisalary');

const router = express.Router();

//save posts

router.post('/addiempsalary/save',(req,res)=>{

    let newAddiEmpsalary = new AddiEmpsalary(req.body);

    newAddiEmpsalary.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Employee salary details saved successfully"
        });
    });

});

//get posts

router.get('/addiempsalary',(req,res) =>{
    AddiEmpsalary.find().exec((err,addiempsalary) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAddiEmpsalary:addiempsalary
        });
    });
});

//get a specific post

router.get("/addiempsalary/:id",(req,res) => {

    let addiempsalaryId = req.params.id;


    AddiEmpsalary.findById(addiempsalaryId,(err,addiempsalary) =>{
        if(err){
            return res.status(400).json({success:false,err});

        }
        return res.status(200).json({
            success:true,
            addiempsalary
        });
    });

});

//update posts

router.put('/addiempsalary/update/:id',(req,res) =>{
    AddiEmpsalary.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,addiempsalary)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }

    );
});
//delete post

router.delete('/addiempsalary/delete/:id',(req,res) =>{
    AddiEmpsalary.findByIdAndRemove(req.params.id).exec((err,deletedAddiEmpsalary) =>{

        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete Successful", deletedAddiEmpsalary
        });
    }); 
});

module.exports = router;