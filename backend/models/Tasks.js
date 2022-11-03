const mongoose = require ('mongoose');//schema based models
const TasksSchema = new mongoose.Schema({


    TaskID:{
        type:String,
        required:true,
        //unique:true
    },
    TaskName:{
        type:String,
        required:true
    },
    ProjectId:{
        type:String,
        required:true
    },
    Project:{
        type:String,
        required:true
    },
    TStartDate:{
        type:String,
        required:true
    },
    TEndDate:{
        type:String,
        required:true
    },
    TStartTime:{
        type:String,
        required:true
    },
    TEndTime:{
        type:String,
    },
    Description:{
        type:String,
    },
    
});
module.exports = mongoose.model('Tasks',TasksSchema);