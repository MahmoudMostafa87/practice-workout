const jwt=require('jsonwebtoken');
const config=require('config');


module.exports=function(req,res,next){
    const token=req.header('token');
    if(!token)return res.status(401).send('token not valid');
    try{
        const decoded=jwt.verify(token,config.get("keytotoken"));
        req.user=decoded;
        res.send(decoded);
        next();
    }
    catch(ex){
        res.status(400).send('this user not can access');
        next(ex);
    };
}