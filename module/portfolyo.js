const mongoose=require('mongoose');


const portfolyoSchema=new mongoose.Schema({
Name:String,
user:
{
type:mongoose.Schema.Types.ObjectId,
required:true,
unique:true,
ref:'User'
},
offer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'offer',
},
isSpecial:{
    type:Boolean,
    default:false,
},
special:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'special'
},

});

const portfolyo=mongoose.model('portfolyo',portfolyoSchema);

module.exports=portfolyo;