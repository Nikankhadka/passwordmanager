
//import the mongoose library
const mongoose=require("mongoose")
const hash=require("../configs/hash")
const db=require("../configs/db")
const aes=require("../configs/crypto")

//need to define a type for how the account is store in db
const accountSchema=new mongoose.Schema({
    //here email acts as id in array of obj
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    id:false
})


//define the usermodel schema creeta instance of the schema
const userschema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        //the id is not to be repeated
        unique:true
    },
    name:String,
    password:{
        type:String,
        //not compularoty because with google no password
    },
    createdAt:{
        type:Date,
        default:()=>Date.now(),
        //does not allow to chnage
        immutable:true
    },
    //pass the current date
    updatedAt:Date,

    //defining the type inside array allows to store object but defining the schema is better
    Accounts:[accountSchema]
})


//create a model instacne 
exports.usermodel=mongoose.model("user",userschema);




//if want to have the db logic here no need to export the model 


//register user functions main db logic
exports.registerUser=async(id,password)=>{
    try{
        console.log("inside model")
        console.log(id,password)
        await db.connect();
        
        //check if the user exist in the model returns an object 
        const checkUser=await this.usermodel.findOne({
            id:id
        })
        console.log(checkUser)
    
        if(checkUser){
            console.log("user already exist")
            return false;

            //create new user document with empty accounts 
        }else{
            const newUser=await  this.usermodel.create({
                    id:id,
                    password:await hash.hashpassword(password),
                    Accounts:[]
            })
            console.log(newUser);
            newUser.save();
            return true;
        }
    }catch(e){
        console.log(e)
    
    }
 

}


//function to get Accounts of specific user


exports.getAccounts=async(userId)=>{
    console.log("inside get accounds model")
    console.log(userId)
    try{
        
        await db.connect();
        // getting user document 
        const userDocument= await this.usermodel.findOne({
            id:userId
        })
        
        // since we ae getting the copy of the document 
        userDocument.Accounts.forEach((account)=>{
            account.password="nikhildon1"
        })
        
        console.log(aes.decrypt(userDocument.Accounts[0].password));
       
        
        





    }
    catch(e){
        console.log(e.message)
    }

}


//data logic to add account in accounts array
exports.addAccount=async(userId,email,password)=>{

    try{
        await db.connect();

        //fetching the user documnet
        const checkAccount=await this.usermodel.findOne({
            id:userId
        })

        // checking the account and return true if already exist
        const accountvalidation=checkAccount.Accounts.some((account)=>{
            if(account.email==email){
                console.log("email already exist")
                return true;
            }else{
                return false
            } 
        })
    
        console.log(accountvalidation);

        // if account already exist in array then 
        if(accountvalidation){
            return false;

        }else{
             // add account in accounts array defined while creating new user s
        const addAccountStatus= await this.usermodel.updateOne({
            id:userId
        },{$push:{
            Accounts:{
                email:email,
                password:await aes.encrypt(password)
            }} })
            
            console.log(addAccountStatus);
            return true;
            }

    }catch(e){
        console.log(e.message)
    }


}

exports.updateAccount=async(userId,email,newemail,newpassword)=>{
try{
        console.log("update account bhitra")
       await db.connect();
       const updateAccountStatus= await this.usermodel.updateMany({
        id:userId,"Accounts.email":email
       },{
        $set:{
            "Accounts.$.email":newemail,
            "Accounts.$.password":await aes.encrypt(newpassword)
        }
       }
       )

       console.log(updateAccountStatus);



}catch(e){
    console.log(e.message)}



}