const express = require('express')
const router = express.Router();
const Meanu = require("../models/meanu");


router.post("/", async (req, res) =>{
try{
  const data = req.body
  const newMeanu = new Meanu(data);

  const response = await newMeanu.save();
  console.log("data saved"),
  res.status(200).json(response);
}
catch(err){
  console.log(err);
  res.status(500).json({error: "Internal Server Error"});
}
})

router.get("/", async(req,res) =>{
  console.log("hit data")
  try{
   const data = await Meanu.find();
    console.log("data fetched");
  res.status(200).json(data);
}
 catch(err){
    console.log(err);
  res.status(500).json({error: "Internal Server Error"});
}
})


router.get("/:workType", async(req, res)=>{
  try{
    const workType = req.params.workType;
    if(workType == "cheif" || workType == "manager" || workType == "waiter"){
      const response = await Meanu.find({work: workType});
      console.log("response fetched");
      res.status(200).json(response);
    }else{
      res.status(400).json({error: "Invalid woek type"});
    }
  }catch{
     console.log(err);
  res.status(500).json({error: "Internal Server Error"});
  }
})


router.put("/:id", async (req,res)=>{
  console.log("put hit");
  try{
     const meanuId = req.params.id; //extract the id from the url params
     const updatedMeanuData = req.body;// update the data fron the person

     const response = await Meanu.findByIdAndUpdate(meanuId, updatedMeanuData, {
      new: true,
      runValidators: true
     })

     if (! response) {
      return res.status(404).json({error: "person not found"})
     }

     console.log("data updated");
     res.status(200).json(response);
  }
  catch{err}

  console.log("err");
     res.status(500).json({error: "internal server error"});
})


router.delete("/:id", async (req,res)=>{
  console.log("put hit");
  try{
     const meanuId = req.params.id; //extract the id from the url params
     

     const response = await Meanu.findByIdAndUpdate(meanuId);

     if (! response) {
      return res.status(404).json({error: "person not found"})
     }

     console.log("data delete");
     res.status(200).json(("delete succesfully"));
  }
  catch{err}

  console.log("err");
     res.status(500).json({error: "internal server error"});
});



module.exports = router;