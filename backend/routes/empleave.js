const express = require("express");
const { count } = require("../models/empleave");
const empleave = require("../models/empleave");
const Empleave = require("../models/empleave");

const router = express.Router(); //express router used to access requests

// const Imagemodel = require('../models/Empleave');

// const Storage = multer.diskStorage({
//     destination:'uploads',
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage')

//Add leave details
// router.post('/upload',(req,res)=> {
//     upload(req,res,(err)=> {
//         if(err) {
//             colsole.log(err)
//             }

//        else {
//         const newImage = new Imagemodel({
//             name: req.body.name,
//             image:{
//                 data:req.file.filename,
//                 contentType: 'image/png'
//             }
//         })
//         newImage.save()
//         .then(()=>res.send("Successfully uploaded"))
//         .catch(err=>console.log(err));
//        }
//     })
// })

//Add empleave
router.post("/empleave/add", (req, res) => {
  let newEmpleave = new Empleave(req.body); //instantiate Shifts

    newEmpleave.save((err) => {
        if(err) {
            return res.status(400).json({       //if error occurs push error
                error:err
            });
        }
        return res.status(200).json({
            success: "Empleave added successfully"
        });
    });


});


router.get('/manempleave',(req,res) =>{
    Empleave.find().exec((err,empleave) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEmpleave:empleave
        });
    });
});


//get a specific empleave using empID
router.get("/empleave/:id",(req,res) =>{

    let EmpleaveId = req.params.id;

    empleave.findById(EmpleaveId,(err,empleave) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            empleave
        });
    });

});

// //get a specific empleave using empID
// router.get("/empleave/:id",(req,res) =>{

//     let EmpleaveId = req.params.id;

//     empleave.findById(EmpleaveId,(err,empleave) =>{
//         if(err){
//             return res.status(400).json({success:false, err});
//         }

//         return res.status(200).json({
//             success:true,
//             empleave
//         });
//     });

// });





//Update empleave
router.put('/empleave/update/:id',(req,res)=>{
    Empleave.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body
    },
    (err,leaverequsts)=>{
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
router.delete("/empleave/delete/:id", (req, res) => {
  Empleave.findByIdAndRemove(req.params.id).exec((err, deletedEmpleave) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedEmpleave,
    });
  });
});

//getting leave count for an employee
router.get("/employee/show/leavecount/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Empleave.find({
      empid: id,
      empleavestatus: "Approved",
    }).count();
    return res.status(200).json(count);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
