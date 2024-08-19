//to creat offer


const express=require('express');
const {Offer,validateOffer}=require('../module/the_offer');
const {Special,validateSpecial}=require('../module/special');
const {User, validateUser}=require('../module/user');

const router=express.Router();

const auth=require('../middleware/auth');
const isTrainer=require('../middleware/istrainer');

router.use(auth);
router.use(isTrainer);

//get all users
router.get('/',async(req,res)=>{
    const data=await User.find();
    if(!data)return res.status(404).send('not found any user');
    res.status(200).send(data);
    //render page found all user in it
});

//get current trainer
router.get('/me',async(req,res)=>{
    const user=await User.findOne(req.user._id);
    if(!user)return res.status(404).send('not found any user');
    res.status(200).send(user);
    //render portfolyo to trainer
});


//get spcifice user
router.get('/:id',async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user)return res.status(404).send('not found user');
    res.status(200).send(user);
    //render page for each user
});

//get all offer
router.get('/',async(req,res)=>{
    const offers=await Offer.find();
    if(!offers)return res.status(404).send('not any offer');
    res.status(200).send(offers);
    //will render page to all offers
});


//get spcifice offer
router.get('/:id',async(req,res)=>{
    const offer=await Offer.findOne(req.params.id);
    if(!offer)return res.status(404).send('not found this offer')
    res.status(200).send(offer);
    //will render page for each offer
});

//search on specifice user 
//will send your data in URL 
//from FORM method GET
//label is name,name is name
//will render this page

router.get('/search',async(req,res)=>{
    const {Name}=req.query;
    const user=await User.findOne({Name:Name});
     if(!user)return res.status(404).send('user not found');
    res.status(200).send(user);
});


//to contanuie show node.js to relationship 


//create offer
router.post('/',async(req,res)=>{
    const offer=_.pick(req.body,['Day','Time','fees','feesofclothes','offername']);
    const {error}=validateOffer(offer);
    if(error)return res.status(400).send(error.details[0].message);

    try{
        const offers=new Offer(offer);
        offers.save();
        res.status(200).send('it is created');
    }
    catch(ex){
        res.status(500).send('not created offer');
    }
});
//create spicial offer
router.post('/',async(req,res)=>{
    const offer=_.pick(req.body,['Day','Time','fees','feesofclothes','offername']);
    const {error}=validateSpecial(offer);
    if(error)return res.status(400).send(error.details[0].message);

    try{
        const offers=new Special(offer);
        offers.save();
        res.status(200).send('it is created');
    }
    catch(ex){
        res.status(500).send('not created offer');
    }
});


//edit for each offer you want it
router.put('/:id',async(req,res)=>{
    let offer=await Offer.findById(req.params.id);
    const update=_.pick(req.body,['Day','Time','fees','feesofclothes','offername']);
    if(!offer)return res.status(404).send('not found offer');
try{
    offer=await Offer.updateOne(offer._id,update);
    offer.save();
    res.status(200).send('is done');
    //res.status(200).redirect(this page again);
    
}catch(ex){
    res.status(500).send(ex);
}

});

//user
router.delete('/',async(req,res)=>{
const Name=req.body.Name;

const {error}=validateUser(Name);
if(error)return res.status(400).send(error.details[0].message);
const user=await User.findOne({Name:Name});
    if(!user)return res.status(404).send('not found user');
 try{
    const isdone=await User.findByIdAndDelete(user._id);
    res.status(200).send(isdone);
    // sendwhocandeletedata([user._id,req.user._id]);
 }catch(ex){
    res.status(500).send('not can delete this user');
 }
});
//delete offer
router.delete('/',async(req,res)=>{
    const offername=req.body.offername;
    const {error}=validateOffer(offername);
if(error)return res.status(400).send(error.details[0].message);
const offer=await User.findOne({offername:offer});
    if(!offer)return res.status(404).send('not found user');
 try{
    const isdone=await User.findByIdAndDelete(offer._id);
    res.status(200).send(isdone);
 }catch(ex){
    res.status(500).send('not can delete this user');
 }
});








//get as notifecation to send date who is delete date
/*

const rout=require('./the_offer');
router.get('/notifcation',async(req,res)=>{
rout.get;
});


function sendwhocandeletedata([data]){


    return data;
}
*/







module.exports=router;