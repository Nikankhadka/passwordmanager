// this is the main module where the crude operation will be handled
const usermodel=require('../models/usermodel')



exports.getAccounts=async(req,res)=>{
    console.log("inside the get accounds handler funtions");
    console.log(req.user);
        await usermodel.getAccounts(req.user);
        res.send("user data retrieved")
}

exports.addAccount=async(req,res)=>{
    console.log("inside addd acount");
   const status= await usermodel.addAccount(req.user,req.body.email,req.body.password);
    status?res.send("account added successfully"):res.send("account already exist")
}

exports.updateAccount=async(req,res)=>{
    console.log("inside update account");
    console.log(req.params.email)
    await usermodel.updateAccount(req.user,req.params.email,req.body.email,req.body.password);
}