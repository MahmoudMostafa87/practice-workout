const winston=require('winston');
module.exports=function(err,req,res,next){
    
winston.log(err);

res.status(500).send('something filed');
}