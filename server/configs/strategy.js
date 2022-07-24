const passport=require("passport");
const hash=require("../configs/hash");
const mongo=require("../configs/db");
const  usermodel=require("../models/usermodel");
//import classes of the strategy to setup
const {Strategy}=require("passport-local");




//setup the strategy
passport.use(
    //takes in instance of the strategy we can define object outside the function and pass the object or directly use new to create obj and pass

    new Strategy({
        //by default the strategy takes username and password for input if want to change that pass in the options
      
    },
    //takes in usename and password autmoatically passed in the body
   async (username,password,done)=>{

        try{    
            //first connect to databaase
            await mongo.connect();

            //since the id for these strategy is username it is passed in filet object
        const checkUser= await usermodel.usermodel.findOne({id:username});
        console.log(checkUser);
        if(checkUser){
            //compare password usingthe compare password function returns true
            if(await hash.comparepassword(password,checkUser.password)){
                console.log("user successfully authenticated now serialize");
                done(null,username);
            }else{
                console.log("password incorrect")
                done(null,null);
            }
            
        }else{
            //not veifired sends response not authorized
            done(null,null)
        }
        }catch(error){
            console.log(error.message);
        }
    })



)





//only when user is authenticated proprerlu
passport.serializeUser((id,done)=>{
    console.log("inside serializeUser")
    
    //serialise user in req.session.passport.user:id
    done(null,id)
})





//once the user is serialized then only this function is called
passport.deserializeUser(async (id,done)=>{
    try{
        console.log("inside deserialize user") 
        await mongo.connect();
        const checkUser= await usermodel.usermodel.findOne({
            id:id
        })
        if(checkUser){
            done(null,id)
            //gets the user id from the passport then attaches the user to req.user enabling to use other function from passport
        }   
       
    }catch(err){
        console.log(err.message);
    }
   
})