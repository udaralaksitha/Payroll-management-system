const mongoose = require("mongoose"); //to connect with db

const empleaveSchema = new mongoose.Schema({
  empleavetype: {
    type: String,
    // required:true
  },
  empleavestartdate: {
    type: Date,
    // required:true
  },
  empleaveenddate: {
    type: Date,
    // required:true
  },

  empid: {
    type: String,
    // required:true
  },

  empleavereason: {
    type: String,
    // required:true
  },
  empleavestatus: {
    type: String,
  },
  empleavename: {
    type: String,
  },
  empleavedate: {
    type: Date,
    default: Date.now,
  },
  empleavecomment: {
    type: String,
  },
});

module.exports = mongoose.model("Empleave", empleaveSchema);
