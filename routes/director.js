const mongoose=require("mongoose");
const express = require('express');
const router = express.Router();

const Director=require("../models/Director");

router.post('/', (req, res, next)=> {
  const director=new Director(req.body);
  const promise= director.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
router.get("/:director_id",(req, res) => {
  const promise=Director.aggregate([
    {
      $match:{
        "_id":mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup:{
        from:"movies",
        localField:"_id",
        foreignField:"director_id",
        as:"movies"
      }
    },
    {
      $unwind:{
        path:"$movies",
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:"$_id",
          name:"$name",
          surname:"$surname"
        },
        movies:{
          $push:"$movies"
        }
      }
    },
    {
      $project:{
        _id:"$_id._id",
        name:"$_id.name",
        surname:"$_id.surname",
        movies:"$movies1"
      }
    }
  ]);

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});

/*router.put("/:director_id",(req, res, next) => {
  const promise= Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data)
      next({message:"movie was not found"});
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});*/
router.delete("/:director_id",(req, res, next) => {
  const promise= Director.findByIdAndRemove(req.params.director_id);
  promise.then((data)=>{
    if(!data)
      next({message:"data was not found"});
    res.json("silindi");
  }).catch((err)=>{
    res.json(err);
  });
});
module.exports = router;
