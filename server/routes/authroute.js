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

//middle ware function check for user then gives accesss to the main request handler
router.get("/authenticate",authcontroller.isAuthenticated,authcontroller.authenticate);


//when using requerst use post for the login route
router.post("/local-login",passport.authenticate("local"),authcontroller.locallogin)


router.get("/google-login",passport.authenticate("google",{
    scope:["profile","email"]}))

    //here the user is serialized  once complete the gets accesss to the request handler if setup else just passed into the callback
router.get("/google-callback",passport.authenticate("google",{
    //this second paramter is used for property and sucess property
    successRedirect:"http://localhost:3000/user",
    failureRedirect:"http://localhost:3000",
}))

router.get("/facebook-login",passport.authenticate("facebook",{scope:["email"]}));
router.get("/facebook-callback",passport.authenticate("facebook",{
    successRedirect:"http://localhost:3000/user",
    failureRedirect:"http://localhost:3000",
}))






router.delete("/logout",async (req,res)=>{
    console.log("inside the logout route")
    await req.session.destroy();
    //now delete the cookie data from the browser and send the res
    res.clearCookie("connect.sid").send(true);
  
})





//export the router for this route
module.exports=router;