const joi=require('joi');
const mongoose=require('mongoose');
//containue

const offerSchema=new mongoose.Schema({
    Name:String,
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
        max:500,
        min:1,
    },
    Limitmax:{
        type:Number,
        min:this.Limitmin,
        max:500,
        min:1,
    },

    //number of fighter to subscribe
    numberofFighter:{
        type:Number,
        default:150,
        min:0,
        max:150,
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
    offername:{
        type:String,
        minlength:0,
        maxlength:1
    },
    users:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users',
    }
    
});




const Offer=mongoose.model('the_Offer',offerSchema);



function validateOffer(offer){
    const schema=joi.object({
    numberofFighter:joi.number().min(0).max(150).required(),
    feesofclothes:joi.required(),
    offername:joi.string().required().uppercase().alphanum(),
    Limitmax:joi.number().min(1).max(500).required(),
    Limitmin:joi.number().min(1).max(500).required()
    });
    return schema.validate(offer);
};



    
module.exports.Offer=Offer
module.exports.validateOffer=validateOffer;
