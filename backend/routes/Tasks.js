const express = require('express');
const Tasks = require('../models/Tasks');
const Task = require ('../models/Tasks');
const router = express.Router();

//save task details
router.post('/task/save',(req,res) =>{
    let newTask = new Task(req.body);

    newTask.save((err) =>{
        if(err){
            return res.status(400).json({//passes incoming requests
                error:err
            });
        }
        return res.status(200).json({
            success:"Task details added successfully"
        });
    });
});

//get task details
router.get('/Tasks',(req,res) =>{
    Task.find().exec((err,Tasks) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTaskDetails:Tasks
        });
    });
});
//get a specific detail
router.get("/getspectask/:id",(req,res) => {
    let Task = req.params.id;

    Tasks.findById(Task,(err,Tasks) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            Tasks
        });
    });
});

//update task details
router.put('/task/updates/:id',(req,res) =>{
    Tasks.findByIdAndUpdate(
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

//delete task details
router.delete('/task/delete/:id',(req,res) =>{
    Tasks.findByIdAndRemove(req.params.id).exec((err,deletedTasks) =>{

        if(err) return res.status(400).json({
                message:"Delete unsuccessful",err
            });
        return res.json({
            message:"Delete Successful",deletedTasks
        });
    });
});


module.exports = router;