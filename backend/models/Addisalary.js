const mongoose = require('mongoose');

const addiempsalarySchema =new mongoose.Schema({

  

    AddType:{
        type:String,
        required:true
        
    },
    AddDate:{
        type:Date,
        required:true
       
    },
    AddPercentage:{
        type:String,
        required:true
    },
    AddMonthly:{
        type:String,
        required:true
         
    },

    Additional:{
        type:String,
        required:true
         
    }  
  


    

    

});


module.exports = mongoose.model('AddiEmpsalary',addiempsalarySchema);