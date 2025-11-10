const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["cheif", "waiter","manager"],
        required: true
    },
    mobile:{
        type: Number,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        //unique: true
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
    
});

personSchema.pre('save', async function(next){
    const person = this;
    // hash the password only if it has been modified (or is new)
    if(!person.isModified('password'))  return next();

    try{
     // hash password generation
     const salt = await bcrypt.genSalt(10);

     //hash password
     const hashedPassword = await bcrypt.hash(person.password, salt);

     // override the plain password with the hashed one
     person.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword){
try{
  // use bcrypt to copare the provide password with the hashedpassword
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}catch(err){
  throw err;
}}
    


const Person = mongoose.model("Person", personSchema);
module.exports = Person