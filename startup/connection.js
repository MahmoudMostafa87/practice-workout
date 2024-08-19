const winston=require('winston');
const mongoose=require('mongoose');
const config=require('config');

module.exports=mongoose.connect(config.get('db'))
.then(()=>winston.info('connection...'))
.catch(ex=>winston.info(`wrong in connect ${ex}`));
