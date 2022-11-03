const mongoose = require('mongoose');

const empsalarySchema =new mongoose.Schema({

    empid: {
        type: String,
        required: true,
    },
    Type:{
        type:String,
        required:true
    },
    Year:{
        type:Number,
        required:true
    },
    Month:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Percentage:{
        type:String,
        required:true
    },
    Monthly:{
        type:String,
        required:true
    },
    Deduction:{
        type:String,
        required:true
    }

});


module.exports = mongoose.model('Empsalary',empsalarySchema);