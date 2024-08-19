const winston=require('winston');
require('express-async-errors');


module.exports=function (){

    //loggin
    
    winston.add(new winston.transports.File({filename:'logging.log'}));
    
    
    //to exceptions
    winston.exceptions.handle(
        new winston.transports.File({filename:'exceptions.log'}),
        new winston.transports.Console(),
    );
    
    
    winston.rejections.handle(
        new winston.transports.File({filename:'rejections.log'}),
        new winston.transports.Console()
    );
    
}