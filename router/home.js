const express=require('express');
const joi=require('joi');
const _=require('lodash');
const {User,validateUser}=require('../module/user');
const {Offer}=require('../module/the_offer');
const portfolyo=require('../module/portfolyo');
const bcrypt=require('bcrypt');
const config=require('config');
const winston=require('winston');

const router=express.Router();


router.get('/',async(req,res)=>{
const data=await Offer.find();

if(!data)return res.status(404).send('not found it');

res.status(200).send(data);
});


router.get('/search',async(req,res)=>{
const  data=_.pick(req.query,['Name']);
let use;
if(data){
    use=await User.find({Name:data.Name});
}
else{
    return res.status(404).send('not found it');
    //mabey exist here error and not can rander the page
}

res.status(200).send(use);

});

router.post('/sign_in',async(req,res)=>{
    let use=_.pick(req.body,['Name','Age','PhoneNumber','Password','Email','Address','Type','Gender','Phoneperante','code']);

    //here is mistake
    const {error}=validateUser(use);
    if(error){
        winston.error(error);    
        return res.status(400).send(error.details[0].message)
    };
    
    let useremail=await User.findOne({Email:use.Email});
    if(useremail)return res.status(400).send('Email or password not valid');

    const salt=await bcrypt.genSalt(10);

    use.Password=await bcrypt.hash(use.Password,salt);
        
    try{

        const user=new User(use);
        await user.save();
        
        const Portfolyo=new portfolyo({user:user._id,Name:use.Name});
        await Portfolyo.save();
        
        if(user.code===config.get('codeTrainer'))await User.updateOne(user,{isTrainer:true});
        
        const token=user.gettoken();
        res.header('token',token);


        res
        .status(200)
        .send(token);
    }

    catch(ex){
        winston.log(ex);
        res.status(500).send('error not can create user');
    }
});



router.post('/login',async(req,res,next)=>{
    try{
    const use=_.pick(req.body,['Email','Password']);

    //mabey find here error because valide for each field is required
    //solution create new schema to account or create overload function to validateuser
    const {error}=validateuser(use);
    if(error)return res.status(400).send(error.details[0].message);
    
    
    let user=await User.findOne({Email:use.Email});

    if(!user)return res.status(404).send('not found this user');
    
    const ishim= bcrypt.compare(use.Password,user.Password);
    if(!ishim){
        return res.status(400).send('email or password is wrong')
    };
    

    const token=user.gettoken();

    res.header('token',token);

    res.status(200).send(token);
    }
    catch(ex){
        next(ex);
    }
});


function validateuser(user){
    const schema=joi.object({
            Email:joi.string().email().required().min(20).max(25),
            Password:joi.string().required().min(6).max(13)
        });
           return schema.validate(user);
    };




module.exports=router;