// const istrainer=require('../middleware/istrainer');
const express=require('express');
const bcrypt=require('bcrypt');
const {User}=require('../module/user');
const {Special}=require('../module/special');
const Portfolyo=require('../module/portfolyo');
const auth=require('../middleware/auth');


const router=express.Router();
router.use(auth);

router.get('/',async(req,res)=>{
    const offer=await Special.find();
    if(!offer)return res.status(404).send('not here any offer');
    res.status(200).send(offer);    
});
router.post('/sign_offer/:id',validateuser,async(req,res)=>{
    const {email,password}=req.body;
    const offer=await Special.findById(req.params.id);
    
    const {error}=validateuser(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    if(!offer)return res.status(404).send('not here any offer');
    if(offer.Limitmax===offer.users.length())return res.status(404).send("not can sign");
    
    const user=await User.findOne({Email:email});
    if(!user)return res.status(404).send("the email or the password not correct");
    
    const isvalid=bcrypt.compare(password,user.Password);
    if(!isvalid)return res.status(400).send("the email or the password not correct");
try{
    //check this again tommaro
    await Portfolyo.findOne(user).populate('users');
    offer.users.push(user._id);
    await Portfolyo.updatOne(user._id,{special:offer._id,isSpecial:true});

    res.status(200).redirect('/');
}catch(ex){
    res.status(500).send('not can save your order');
}

});




function validateuser(user){
    const schema=joi.object({
            Email:joi.string().email().required().min(20).max(25),
            password:joi.string().required().min(6).max(13)
        });
           return schema.validate(user);
    };













//not anybody
//triner any time
//parent or fighter when sign

//it has two page to user
//1 page anybody can see it 
//2 not anybody can see page










module.exports=router;