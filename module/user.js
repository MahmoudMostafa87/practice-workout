const mongoose=require('mongoose');
const joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    id:{
        type:Number,
        default:0,
    },
    Name:{
        type:String,
        maxlength:15,
        minlength:4,
        required:true,
        trim:true,
    },
    Age:{
        type:Number,
        min:5,
        max:90,
    },
    Phonenumber:{
        type:String,
        minlength:9,
        maxlength:13,
        required:true,
        unique:true
    },
    Address:{
        type:String,
        required:true,
    },
    
    Type:{
        type:String,
        enum:['trainner','parent','fighter'],
        required:true,
    },
    Gender:{
        type:String,
        enum:['male','female'],
        required:true,
    },    
    Phoneperante:{
        type:String,
        minlength:9,
        maxlength:13,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        match:/@*.com/i,
        unique:true,
        required:true,
    },
    Password:{
        type:String,
        minlength:6,
        maxlength:100,
        required:true,
        unique:true,
    },
    is_Sign_in_offer:{
        type:Boolean,
        default:false,
    },
    code:{
        type:Number,
        required:true,
        unique:true,
        min:5000,
        max:10000000
    },
    isTrainer:{
        type:Boolean,
        default:false,
    },

    Date:{type:Date,default:Date.now()},
    
});

// token

userSchema.methods.gettoken=function(){
    const token =jwt.sign({_id:this._id,Email:this.Email,isTrainer:this.isTrainer},config.get('keytotoken'));
    return token;
}



const user=mongoose.model('user',userSchema);

//vlidation 
async function validateUser(user){
    const schema=await joi.object({
        Name:joi.string().min(4).max(15).required().alphanum().trim(),
        Phonenumber:joi.string().min(9).max(13).required(),
        Phoneperante:joi.string().min(9).max(13).required(),
        Email:joi.string().email().required().example('mohamed33@gmail.com').min(20).max(25),
        Password:joi.string().min(6).max(13).required(),
        Address:joi.string().min(15).max(30).required(),
        Gender:joi.string().valid('female','male').required(),
        Age:joi.number().required().max(90).min(5),
        Type:joi.string().required().valid('trainner','parent','fighter'),
        code:joi.number().required().min(5000).max(10000000)
    });
    return schema.validate(user);

}





module.exports.validateUser=validateUser;
module.exports.User=user;