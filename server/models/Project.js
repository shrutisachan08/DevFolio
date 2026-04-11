const mongoose=require("mongoose");
const projectSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    longDescription:{type:String},
    techStack:[String],
    imageUrl:{type:String},
    liveUrl:{type:String},
    githubUrl:{type:String},
    featured:{type:Boolean,default:false},
    views:{type:Number,default:0},
    clicks:{type:Number,default:0},
},{timestamp:true});

module.exports = mongoose.model("Project", projectSchema);
