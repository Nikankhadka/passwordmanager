//import router function from express lib
const {Router}=require('express');
const passport=require('passport');
//importing the auith controller
const authcontroller=require("../controllers/authhandler");

//whereever the passports authenticate functions is called import the strategy module there
require("../configs/strategy");


//creating a router instace 
const router=Router();


router.post("/register-user",authcontroller.registerUser);





//when using requerst use post for the login route
router.post("/local-login",passport.authenticate("local"),authcontroller.locallogin)











//export the router for this route
module.exports=router;