const mongoose = require ('mongoose');//schema based models
const ProjectsSchema = new mongoose.Schema({


    ProjectId:{
        type:String,
        required:true,
        unique:true
    },
    Project:{
        type:String,
        required:true
    },
    Assignees:{
        type:String,
        required:true
    },
    PStartDate:{
        type:Date,
        required:true
    },
    PEndDate:{
        type:Date,
        required:true
    },
    Progress:{
        type:String,
    },
    ProjectOwner:{
        type:String,
    },
    Budget:{
        type:Number,
        required:true
    },
    SpentOn:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Remaining:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model('Projects',ProjectsSchema);