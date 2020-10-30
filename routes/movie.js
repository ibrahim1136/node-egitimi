const express = require('express');
const router = express.Router();
const movimie=require("../models/Movie");
/*const Movie=require("../models/Movie");*/

router.get("/",(req, res, next) => {
  const promise= movimie.aggregate([
  {
    $lookup:{
      from:"directors",
      localField:"director_id",
      foreignField:"_id",
      as:"director"
    }
  },
    {
      $unwind:"$director"
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
router.get("/:movie_id",(req, res, next) => {
  const promise= movimie.findById(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
      next({message:"movie was not found"});
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
router.put("/:movie_id",(req, res, next) => {
  const promise= movimie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data)
      next({message:"movie was not found"});
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.post('/', (req, res, next)=> {
  const movie=new movimie(req.body);

/*  const movie=new Movie(req.body);

  movie.save((err,data)=>{
    if (err)
      res.json(err);
    res.json(data);

  });*/
  movie.save((err,data)=>{
    if (err)
      res.json(err);
    res.json(data);
  });

});

module.exports=router;


router.delete("/:movie_id",(req, res, next) => {
  const promise= movimie.findByIdAndRemove(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
      next({message:"movie was not found"});
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  });
});





