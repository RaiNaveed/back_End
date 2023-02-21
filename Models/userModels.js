const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    registerAt:{
        type:Date,
        default:Date()
    }
});

userSchema.pre('save', function(next){
    if(this.isModified('Password')){
        bcrypt.hash(this.Password, 10, (err, hash)=>{
            if(err) return next(err);
            this.Password = hash;
            next();
        } )
    }
})

module.exports =  mongoose.model('userModel', userSchema) 