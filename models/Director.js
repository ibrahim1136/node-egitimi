const mongoose=require("mongoose");
const Schema=mongoose.Schema;



const directorschema=new Schema({
    name:String,
    surname:String
});


module.exports=mongoose.model("director",directorschema);