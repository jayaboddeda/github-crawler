const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    theme:{
        type:String
    }
})

signupSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }

    next();
})

const signup = new mongoose.model("signup", signupSchema) ;
module.exports = signup;