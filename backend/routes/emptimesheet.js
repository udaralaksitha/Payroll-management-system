const express = require("express");
const emptimesheet = require("../models/emptimesheet");
const Emptimesheet = require("../models/emptimesheet");

const router = express.Router(); //express router used to access requests

//Add time
router.post("/emptimesheet/add", (req, res) => {
  let newEmptimesheet = new emptimesheet(req.body); //instantiate times

  newEmptimesheet.save((err) => {
    if (err) {
      return res.status(400).json({
        //if error occurs push error
        error: err,
      });
    }
    return res.status(200).json({
      success: "Emptimesheet added successfully",
    });
  });
});

//get all times
router.get('/manemptimesheet',(req,res) =>{
    Emptimesheet.find().exec((err,emptimesheet) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEmptimesheet:emptimesheet
        });
    });
});

router.post("/emptimesheet/emp/:id",(req,res) => {

    let empTimeId = req.params.id;

    console.log(req.body.month,req.body.year)

    emptimesheet.find({empid:empTimeId,emptimemonth:req.body.month,emptimeyear:req.body.year},(err,empTime) =>{
        if(err){
            return res.status(400).json({success:false,err});

        }
        console.log(empTime)
        return res.status(200).json({
            success:true,
            empTime
        });
    });

});


//get a specific time record using empID
router.get("/emptimesheet/:id",(req,res) =>{

    let EmptimesheetId = req.params.id;

    emptimesheet.findById(EmptimesheetId,(err,emptimesheet) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            emptimesheet
        });
    });


});






//Update time
router.put('/emptimesheet/update/:id',(req,res)=>{
    Emptimesheet.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body
    },
    (err,emptimesheet)=>{
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
router.delete("/emptimesheet/delete/:id", (req, res) => {
  Emptimesheet.findByIdAndRemove(req.params.id).exec(
    (err, deletedEmptimesheet) => {
      if (err)
        return res.status(400).json({
          message: "Delete unsuccessful",
          err,
        });

      return res.json({
        message: "Delete Successful",
        deletedEmptimesheet,
      });
    }
  );
});

module.exports = router;
