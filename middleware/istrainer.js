module.exports=function(req,res,next){
if(!req.user.isTrainer)return res.status(403).send('you are not trainer');
next();
};