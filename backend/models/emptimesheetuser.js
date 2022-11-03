const mongoose = require('mongoose'); //to connect with db
var uniqueValidator = require('mongoose-unique-validator');

const emptimesheetuserSchema = new mongoose.Schema({

 
    emptstartdate:{                 
       type: Date
    },
    emptenddate:{                 
        type: Date
     }, 
    emptweek:{                 
        type: String 
        // required:true
    },  
    emptmonstart:{                 
        type: String
        // required:true 
    }, 

    emptmonend:{                 
        type: String
        // required:true 
    }, 
     
    monot:{                 
        type:String
        // required:true
    },
    montot:{                 
        type: String
     },
     empttuestart:{                 
         type:Date 
         // required:true
     },  
     empttueend:{                 
         type:Date 
         // required:true
     },  
     tueot:{                 
         type:String
         // required:true 
     }, 
 
     tuetot:{                 
         type:String
         // required:true 
     }, 
      
     emptwedstart:{                 
         type:Date
         // required:true
     },
     emptwedend:{                 
        type: Date
     },
     wedot:{                 
         type:String 
         // required:true
     },  
     wedtot:{                 
         type:String 
         // required:true
     },  
     empthustart:{                 
         type:Date
         // required:true 
     }, 
 
     emptthuend:{                 
         type:Date
         // required:true 
     }, 
      
     thuot:{                 
         type:String
         // required:true
     },
     thutot:{                 
        type: String
     },
     emptfristart:{                 
         type:Date 
         // required:true
     },  
     emptfriend:{                 
         type:Date 
         // required:true
     },  
     friot:{                 
         type:String
         // required:true 
     }, 
 
     fritot:{                 
         type:String
         // required:true 
     }, 
      
     emptsatstart:{                 
         type:Date
         // required:true
     },
     emptsatend:{                 
        type: Date
     },
     satot:{                 
         type:String 
         // required:true
     },  
     sattot:{                 
         type:String 
         // required:true
     },  
     emptsunstart:{                 
         type:Date
         // required:true 
     }, 
 
     emptsunend:{                 
         type:Date
         // required:true 
     }, 
      
     sunot:{                 
         type:String
         // required:true
     },
     suntot:{                 
        type: String
     },
     weekot:{                 
         type:String 
         // required:true
     },  
     weektot:{                 
         type:String 
         // required:true
     },
     empid:{
        type:String
        
     },
     emptcomment:{ 
      type:String 
     // required:true
     },
     emptimestatus:{
        type:String 
        // required:true
    },
    emptimemonth:{
        type:String 
    },
    emptimename:{
        type:String
    }
    
    
});

// emptimeSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
//exports the model which has two parameters, Name of table and  the declared schema
module.exports = mongoose.model('Emptimesheetuser',emptimesheetuserSchema);