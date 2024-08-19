//any one given the permission
// to sign in any thing and show all offers but not anybody can create offer
//trinner can create offer 

const express=require('express');
const {Offer}=require('../module/the_offer');
const {User}=require('../module/user');
const portfolyo=require('../module/portfolyo');
const auth=require('../middleware/auth');
const router=express.Router();



router.get('/',async(req,res)=>{
    const offer=await Offer.find();
    if(!offer)return res.status(404).send('not found any data');
    res.status(200).send(offer);
});

router.post('/',auth,async(req,res,next)=>{
    try{
    const  offer=await Offer.findOne({Name:req.query.Name});
    if(!offer)return res.status(404).send('not found it');

    if(offer.users.length()===offer.Limitmax)return res.status(400).send('this offer is completed');
    const portfoly=await portfolyo.findOne({user:req.user._id});
    const user=await User.findById(req.user._id);

    if(user.is_Sign_in_offer)return res.status(400).send('you are singed in an offer from later');

    offer.users.push(user._id);

    
    await portfolyo.updateOne(portfoly,{offer:offer});
    
    await User.updateOne(user,{is_Sign_in_offer:true});

    await User.updateOne(user,{id:offer.users.length()});

    res.status(200).send(user);
    }
    catch(ex){
        next(ex);
    }
});


router.delete('/:id',auth,async(req,res,next)=>{
    try{
    const  offer=await Offer.findOne(req.query);
    const user=await User.findById(req.user._id);
    const portfoly=await portfolyo.findOne(user._id).populate('user');
    if(!offer)res.status(404).send('not found it');
    
    if(!user.is_Sign_in_offer)return res.status(400).send('not sign in any offer');
        
    offer.users.splice(user.id,user.id+1,user._id);

    await portfolyo.deleteOne(portfoly,offer);

    await User.updateOne(user,{is_Sign_in_offer:false});

    res.status(200).send('done');
    }
    catch(ex){
        next(ex);
    }
});


router.get('/:id',async(req,res)=>{
    const id=req.body.id;
    const offer=await Offer.findById(id).select('-users');

    if(!offer)return res.status(404).send('not this offer');
    req.params.id=id;
    res.status(200).send(offer);
}
);


module.exports=router;
