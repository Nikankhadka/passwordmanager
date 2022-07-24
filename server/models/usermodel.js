
//import the mongoose library
const mongoose=require("mongoose")
const hash=require("../configs/hash")
const db=require("../configs/db")
//need to define a type for how the account is store in db
const accountSchema=new mongoose.Schema({
    //here email acts as id in array of obj
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
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
        const checkUser=await usermodel.findOne({
            id:id
        })
        console.log(checkUser)
    
        if(checkUser){
            console.log("user already exist")
            return false;

            //create new user document with empty accounts 
        }else{
            const newUser=await  usermodel.create({
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