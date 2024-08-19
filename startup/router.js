require('express-async-errors');
const home=require('../router/home');
const me=require('../router/portfolyo');
const the_offer=require('../router/the_offer');
const special=require('../router/special');
const trainer=require('../router/trainer');
const error=require('../middleware/error');
const config=require('config');
// if(!config.get('env') ==='production'){
//     console.info('not can turn on');
//     process.exit(0);
// };

//to know data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

module.exports=(app)=>{
app.use('/',home);
app.use('/me',me);
app.use('/offers',the_offer);
app.use('/special',special);
app.use('/trainer',trainer);
app.use(error);
};
//router for each API