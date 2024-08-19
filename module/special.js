const mongoose=require('mongoose');
const joi=require('joi');

const specialSchema=new mongoose.Schema({

    Day:{
        type:String,//monday as Example 
        required:true,
    },

    Time:{
        type:String,
        required:true,
        unique:true,
    },
    Limitmin:{
        type:Number,
        max:10,
        min:1,
    },
    Limitmax:{
        type:Number,
        max:10,
        min:1,
    },

    //number of fighter to subscribe
    numberofFighter:{
        type:Number,
        min:0,
        max:5,
    },

    fees:{
        type:Number,
        required:true,

    },
    //clothes
    feesofclothes:{
        type:Number,
        required:true,
    },
    timeofspecial:{
        type:String,
        required:true,
},
users:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Users',
}

});

const Special=mongoose.model('special',specialSchema);


function validateSpecial(special){
    const schema=joi.object({
        Day:joi.string().required(),
        Time:joi.string().required(),
        numberofFighter:joi.number().required(),
        feesofclothes:joi.number().required().min(2000).max(4000),
        Limitmax:joi.number().min(1).max(500).required(),
        Limitmin:joi.number().min(1).max(500).required()
    });
    return schema.validate(special);

}



module.exports.Special=Special;
module.exports.validateSpecial=validateSpecial;