const express = require('express');
const Projects = require('../models/Projects');
const Proj = require ('../models/Projects');
const router = express.Router();

//save project details
router.post('/proj/save',(req,res) =>{
    let newProj = new Proj(req.body);

    newProj.save((err) =>{
        if(err){
            return res.status(400).json({//passes incoming requests
                error:err
            });
        }
        return res.status(200).json({
            success:"Project details saved successfully"
        });
    });
});

//get project details
router.get('/Projects',(req,res) =>{
    Proj.find().exec((err,Projects) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingProjDetails:Projects
        });
    });
});
//get a specific detail
router.get("/getspecproj/:id",(req,res) => {
    let Proj = req.params.id;

    Projects.findById(Proj,(err,Projects) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            Projects
        });
    });
});

//update project details
router.put('/proj/updates/:id',(req,res) =>{
    Projects.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated successfully"
            });
        }
    );
});

//delete projects details
router.delete('/proj/delete/:id',(req,res) =>{
    Projects.findByIdAndRemove(req.params.id).exec((err,deletedProjects) =>{

        if(err) return res.status(400).json({
                message:"Delete unsuccessful",err
            });
        return res.json({
            message:"Delete Successful",deletedProjects
        });
    });
});


module.exports = router;