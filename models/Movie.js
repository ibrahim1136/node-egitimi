const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const movieschema=new Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type: String,
        required:[true,"`{PATH}` alanı zorunludur"],
        maxlength:[12,"`{PATH}` alanı `{VALUE}`,({MAXLENGTH}) karakterden az olmalıdır"],
        minlength:[4,"`{PATH}` alanı `{VALUE}`,({MINLENGTH}) karakterden çok olmalıdır"]
    },
    category: String,
    country: String,
    year:{
        type:Number,
        max:2023,
        min:1950
    }
});

module.exports=mongoose.model("movie",movieschema);


