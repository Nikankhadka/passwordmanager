//import router function from express lib
const {Router}=require('express');
const passport=require('passport');
//importing the auith controller
const authcontroller=require("../controllers/authhandler");

//import main strategy from strategy.js
require("../configs/strategy");


//creating a router instace 
const router=Router();

//when using requerst use post for the login route
router.post("/local-login",passport.authenticate("local"),authcontroller.locallogin)











//export the router for this route
module.exports=router;