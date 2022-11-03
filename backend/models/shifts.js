const mongoose = require("mongoose"); //to connect with db

const shiftsSchema = new mongoose.Schema({
  empshiftid: {
    type: String,
  },
  empname: {
    type: String,
  },
  weekstartdate: {
    type: String,
  },
  weekenddate: {
    type: String,
  },
  weeknumber: {
    type: String,
  },
  shiftmonstart: {
    type: String,
  },
  shiftmonend: {
    type: String,
  },
  shifttuestart: {
    type: String,
  },
  shifttueend: {
    type: String,
  },
  shiftwedstart: {
    type: String,
  },
  shiftwedend: {
    type: String,
  },
  shiftthustart: {
    type: String,
  },
  shiftthuend: {
    type: String,
  },
  shiftfristart: {
    type: String,
  },
  shiftfriend: {
    type: String,
  },
  shiftsatstart: {
    type: String,
  },
  shiftsatend: {
    type: String,
  },
  shiftsunstart: {
    type: String,
  },
  shiftsunend: {
    type: String,
  },
});

module.exports = mongoose.model("Shifts", shiftsSchema);
