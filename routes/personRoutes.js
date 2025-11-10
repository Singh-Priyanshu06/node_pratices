const express = require('express')
const router = express.Router();
const Person = require("../models/Person");


router.post("/", async (req, res) =>{
try{
  const data = req.body
  const newPerson = new Person(data);

  const response = await newPerson.save();
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
   const data = await Person.find();
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
      const response = await Person.find({work: workType});
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
     const personId = req.params.id; //extract the id from the url params
     const updatedPersonData = req.body;// update the data fron the person

     const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
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
     const personId = req.params.id; //extract the id from the url params
     

     const response = await Person.findByIdAndUpdate(personId);

     if (! response) {
      return res.status(404).json({error: "person not found"})
     }

     console.log("data delete");
     res.status(200).json(("delete succesfully"));
  }
  catch{err}

  console.log("err");
     res.status(500).json({error: "internal server error"});
})




module.exports = router;