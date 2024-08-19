//three given the permission
//triner
//perante has this fighter
//fighter has this portfolyo


const express=require('express');
const _=require('lodash');
const {User,validateUser}=require('../module/user');
const router=express.Router();
const auth=require('../middleware/auth');

router.use(auth);

router.get('/:id',async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password');
    req.params.id=req.user._id;
    res.status(200).send(user);
});

router.put('/',async(req,res)=>{
const use=_.pick(req.body,['name','Age','Address'])
     const {error}=validateUser(use);
    if(error)return res.status(400).send('not can update the account data not valid');
    
    let user=await User.findOne(use);
    if(user)return res.status(400).send('try again');
    try{
        user=await User.updateOne(req.user._id,use);
        res.status(200).send(user);
    }
    catch(ex){
        res.status(500).send('error not can update user');
    };
});

router.delete('/log_out',async(req,res)=>{
    await User.findByIdAndDelete(req.user._id);
    res.send(200).send('done');
});


module.exports=router;