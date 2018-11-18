const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

  const userSchema = new Schema({
    email: { type:String, require:true, unquie:true, lowercase:true},
    username: { type:String, require:true, unquie:true, lowercase:true},
    password: { type:String, require:true}

  });

  userSchema.pre('save', function(next){

  if(!this.isModified('password')){
    return next();
    bcrypt.hash(this.password,null,null,(err,hash)=>{
      if(err) return next(err);
      this.password=hash();
      next();
    });
  }
  });
  module.exports = mongoose.model('User', userSchema);