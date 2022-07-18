// no need to use const to define a function just export the request handler













//this route handler is only accessed when the user is authenticated properly
exports.locallogin=async(req,res)=>{
    console.log(req.body);
    console.log(req.session);

    //here the resposnse is passed to client because the api request expects a response 
    res.send("loggedin");
}