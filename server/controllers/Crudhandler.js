// this is the main module where the crude operation will be handled
const usermodel=require('../models/usermodel')



exports.getAccounts=async(req,res)=>{
    console.log("inside the get accounds handler funtions");
    console.log(req.user);
    const Accounts= await usermodel.getAccounts(req.user);
    res.send(Accounts)
}

exports.addAccount=async(req,res)=>{
    console.log("inside addd acount");
   const status= await usermodel.addAccount(req.user,req.body.email,req.body.password);
    status?res.send({
        status:true,
    }):res.send({
        status:false,
    })
}

exports.updateAccount=async(req,res)=>{
    console.log("inside update account");
    console.log(req.params.email)
    const updateStatus=await usermodel.updateAccount(req.user,req.params.email,req.body.email,req.body.password);
    updateStatus?res.send({
        status:true,
    }):res.send({
        status:false,
    })
}

exports.deleteAccount=async(req,res)=>{
    console.log("inside delete account controller")
    const deleteStatus=await usermodel.deleteAccount(req.user,req.params.email);
    deleteStatus?res.send({
        status:true,
    }):res.send({
        status:false,
    })
}