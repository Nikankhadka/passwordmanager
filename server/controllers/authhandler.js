// no need to use const to define a function just export the request handler

const usermodel=require("../models/usermodel");






exports.registerUser=async(req,res)=>{
    console.log("inside register user");
    console.log(req.body);
    const userStatus=await usermodel.registerUser(req.body.username,req.body.password)

    //use ternary operator to check if user is registered or not
    userStatus?res.send(true):res.send(false);
}




//this route handler is only accessed when the user is authenticated properly
exports.locallogin=async(req,res)=>{
    //check for the modified session obj 
    console.log(req.session);

    //here the resposnse is passed to client because the api request expects a response 
    res.send("logged in");
}


//aauthentication middleware function
exports.isAuthenticated=(req,res,next)=>{
    req.user? next():res.send(false);
}


//once the user is check by the above middle ware function the request handler passes the repsonse 
exports.authenticate=(req,res)=>{
    res.send(req.user);
}