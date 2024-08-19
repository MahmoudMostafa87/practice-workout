const winston=require('winston');
const express=require('express');
require('./startup/connection');
require('./startup/logging')();
const config=require('config');
//router offer first
//router portfolyo secound
//router special thired
//relationship
const app=express();



//router API
require('./startup/router')(app);


//default pages
app.set('view','view engin');
app.set('./views','ejs');





/*
1-create token to user

2- create module to new table 

3- create vlidate for new table


4-create API 


5-create login and sign in and containue middleware


6- not forget view and ejs and static file (public) and create all schema to shape server


*/





const Port=process.env.Port||3000;
app.listen(Port,()=>{
    winston.info(Port+'...');
});








//in this project I learned one step
//1=> I learned how data will send to backend in URL and how work with it
//2=>req.secure();=> this function return type is boolean it check is data recommend https or http (true or false)