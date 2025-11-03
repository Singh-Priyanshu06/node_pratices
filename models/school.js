const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["teacher", "student","sir"],
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

const School = mongoose.model("School", schoolSchema);
module.exports = School