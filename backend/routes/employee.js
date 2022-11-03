const express = require("express");
const Employee = require("../models/employee");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = express.Router();
const transporter = require("../sendEmail/email");
const employee = require("../models/employee");

//post data to database
router.post("/employee/add", async (req, res) => {
  let profileBuffer, profileContent;
  let nicBuffer, nicContent;

  if (req.body.profilePath) {
    profileBuffer = fs.readFileSync(req.body.profilePath.filePath);
    profileContent = req.body.profilePath.type;
  } else {
    profileBuffer = "";
    profileContent = "";
  }
  if (req.body.nicPath) {
    nicBuffer = fs.readFileSync(req.body.nicPath.filePath);
    nicContent = req.body.nicPath.type;
  } else {
    nicBuffer = "";
    nicContent = "";
  }

  let empName = req.body.empName;
  let empadd = req.body.empadd;
  let nic = req.body.nic;

  empName = empName.charAt(0).toUpperCase() + empName.slice(1).toLowerCase();
  empadd = empadd.charAt(0).toUpperCase() + empadd.slice(1).toLowerCase();
  nic = nic.toUpperCase();
  const hashedPassword = await bcrypt.hash(req.body.empPwd, 12);

  const newEmployee = new Employee({
    titleName: req.body.titleName,
    empid: req.body.empid,
    empName: empName,
    empPwd: hashedPassword,
    empadd: empadd,
    empPhone: req.body.empPhone,
    email: req.body.email,
    dob: req.body.dob,
    nic: nic,
    dateApp: req.body.dateApp,
    gender: req.body.gender,
    jtype: req.body.jtype,
    profilePic: {
      data: profileBuffer,
      contentType: profileContent,
    },
    nicPic: {
      data: nicBuffer,
      contentType: nicContent,
    },
  });

  try {
    await newEmployee.save();
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get

router.get("/employee/show", (req, res) => {
  Employee.find().exec((err, Employee) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEmployee: Employee,
    });
  });
});

router.get("/employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requiredEmployee = await Employee.find({ empid: id });
    return res.status(200).json(requiredEmployee.length);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// get employee name and profile pic
router.get("/employee/get/details/:id", (req, res) => {
  const { id } = req.params;
  Employee.find({ empid: id })
    .select("empName profilePic")
    .exec((err, Employee) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingEmployee: Employee,
      });
    });
});

//forgot password
router.post("/reset-password/:email",(req,res) =>{
  const { email } = req.params;

  crypto.randomBytes(32,(err,buffer) => {
    if(err){
    console.log(err)
    }
    const token = buffer.toString("hex")
    
    Employee.findOne({email:email})
    .then(employee =>{
      if(!employee){
        return res.status(400).json({error:"No Employee Exits!"})
      }
      else{
        employee.resetToken = token
        employee.expireToken = Date.now() + 3600000
        var mailOptions = {
          to: email,
          subject: "Password reset",
          html: `
            <p> You requested for password reset </p>
            <h> Click this <a href='http://localhost:8400/reset/${token}'>link</a> to reset password </h>
          `,
        };
       
      }  
      employee.save().then((res) => {
        transporter.sendMail(mailOptions);
      });
      return res.status(200).json({ message: "Email sent" });
    })
  })
   
   


})

//mongoDB id
router.get("/employee/show/:id", (req, res) => {
  const { id } = req.params;
  Employee.findById(id).exec((err, Employee) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEmployee: Employee,
    });
  });
});

//update employee
router.patch("/employee/edit/:id", async (req, res) => {
 
  const { id } = req.params;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      titleName: req.body.titleName,
      empid: req.body.empid,
      empName: req.body.empName,
      empPwd: req.body.empPwd,
      empadd: req.body.empadd,
      empPhone: req.body.empPhone,
      email: req.body.email,
      dob: req.body.dob,
      nic: req.body.nic,
      dateApp: req.body.dateApp,
      gender: req.body.gender,
      jtype: req.body.jtype,
    
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete
router.delete("/employee/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.deleteOne({ empid: id });
    res.status(200).json("Deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//login
router.post("/home", async (req, res) => {
  const { empid, empPwd } = req.body;
  try {
    const oldEmp = await Employee.findOne({ empid: empid });

      const isPasswordCorrect = await bcrypt.compare(empPwd, oldEmp.empPwd);

      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Incorrect credentials" });
      } else {
        if (empid === oldEmp.empid) {
          return res.status(200).json(oldEmp);
        } else {
          res.status(400).json({ message: "Incorrect credentials" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

});



module.exports = router;
