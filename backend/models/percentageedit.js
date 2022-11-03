const mongoose = require('mongoose');

const empsalaryperSchema =new mongoose.Schema({

    Typeper:{
        type:String,
        required:true
          
    },

    Percentageper:{
        type:String,
        required:true
          
    },
    perhour:{
        type:String,
        required:true
          
    }
    
  


  

});


module.exports = mongoose.model('Empsalaryper',empsalaryperSchema);