const express = require("express");
const empshift = require("../models/shifts");
const Empshift = require("../models/shifts");
const router = express.Router(); //express router used to access requests

//Add shift
router.post("/empshift/add", (req, res) => {
  let newEmpshift = new empshift(req.body); //instantiate shifts

  newEmpshift.save((err) => {
    if (err) {
      return res.status(400).json({
        //if error occurs push error
        error: err,
      });
    }
    return res.status(200).json({
      success: "Empshift added successfully",
    });
  });
});

//get all shifts
router.get("/manempshift", (req, res) => {
  Empshift.find().exec((err, empshift) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEmpshift: empshift,
    });
  });
});

//get a specific shift record using empID
router.get("/empshift/:id", (req, res) => {
  let EmpshiftId = req.params.id;

  empshift.findById(EmpshiftId, (err, empshift) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      empshift,
    });
  });
});

//Update shift
router.put("/empshift/update/:id", (req, res) => {
  Empshift.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, empshift) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//delete
router.delete("/empshift/delete/:id", (req, res) => {
  Empshift.findByIdAndRemove(req.params.id).exec((err, deletedEmpshift) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedEmpshift,
    });
  });
});

module.exports = router;
