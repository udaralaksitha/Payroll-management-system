const express = require('express');
const emptimesheetuser = require('../models/emptimesheetuser');
const Emptimesheetuser = require('../models/emptimesheetuser');

const router = express.Router();               //express router used to access requests


//Add time
router.post('/emptimesheetuser/add',(req,res)=> {
    
    let newEmptimesheetuser = new emptimesheetuser(req.body);   //instantiate times

    newEmptimesheetuser.save((err) => {
        if(err) {
            return res.status(400).json({       //if error occurs push error
                error:err
            });
        }
        return res.status(200).json({
            success: "Emptimesheet added successfully"
        });
    });


});

//get all times
router.get('/manemptimesheetuser',(req,res) =>{
    Emptimesheetuser.find().exec((err,emptimesheetuser) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEmptimesheetuser:emptimesheetuser
        });
    });
});


//get a specific time record using empID
router.get("/emptimesheetuser/:id",(req,res) =>{

    let EmptimesheetuserId = req.params.id;

    emptimesheetuser.findById(EmptimesheetuserId,(err,emptimesheetuser) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            emptimesheetuser
        });
    });


});






//Update time
router.put('/emptimesheetuser/update/:id',(req,res)=>{
    Emptimesheetuser.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body
    },
    (err,emptimesheetuser)=>{
       if(err){ 
        return res.status(400).json({error:err});
    }
    return res.status(200).json({
        success:"Updated Successfully"
    });
    }
    );

});








//delete
router.delete('/emptimesheetuser/delete/:id',(req,res)=>{
    Emptimesheetuser.findByIdAndRemove(req.params.id).exec((err,deletedEmptimesheetuser) => {

        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete Successful",deletedEmptimesheetuser
        });
    });
});    




module.exports = router;