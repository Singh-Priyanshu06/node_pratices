const mongoose = require("mongoose");

const meanuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["cheif", "manager","waiter"],
        required: true
    },
    mobile:{
        type: Number,
        require: true,
        //unique: true
    },
    email:{
        type: String,
        require: true,
        //unique: true
    }
});

const Meanu = mongoose.model("Meanu", meanuSchema);
module.exports = Meanu