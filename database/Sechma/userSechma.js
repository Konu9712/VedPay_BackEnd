const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const dotenv = require("dotenv").config();
// const jwt = require("jsonwebtoken");

const userSechma = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

// ----------------If want to use middle ware to hash password------------------
// userSechma.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password,12)
//         this.cpassword = await bcrypt.hash(this.cpassword,12)

//     }
//     next();
// });

//Generate Toke
// userSechma.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     }catch(e){
//         console.log(e);
//     }
// }

const User = mongoose.model("User", userSechma);
module.exports = User;
