const mongoose = require("mongoose");

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
    }
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person