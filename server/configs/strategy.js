const passport=require("passport");
const hash=require("../configs/hash");
const mongo=require("../configs/db");
const  usermodel=require("../models/usermodel");

//necessary to get acess to variables in the dotenv
require("dotenv").config();

//import classes of the strategy to setup
const {Strategy}=require("passport-local");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const FacebookStrategy=require("passport-facebook").Strategy;


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




//now to setup the google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.google_client_id,
            clientSecret:process.env.google_client_secret,
            callbackURL:"http://localhost:2900/google-callback"
        },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                //once the user has been authorized the information is passed into profile 

            const id=profile._json.email;

            await mongo.connect();
            //check that user in the database
            const checkUser=await usermodel.usermodel.findOne({
                id:id
            })
            if(checkUser){
                
                done(null,id);
            }else{
                //add new user doc into the collection
                const newUser=await  usermodel.usermodel.create({
                    id:id,
                    Accounts:[]
                })
                newUser.save();
                done(null,id);
            }

        }catch(err){
            console.log(err.message);
        }

            
    }
    )
    )


    //now to setup the google strategy
passport.use(
    new FacebookStrategy(
        {
            clientID:process.env.facebook_client_id,
            clientSecret:process.env.facebook_client_secret,
            callbackURL:"http://localhost:2900/facebook-callback"
        },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                //once the user has been authorized the information is passed into profile 

            const id=profile._json.id;

            await mongo.connect();
            //check that user in the database
            const checkUser=await usermodel.usermodel.findOne({
                id:id
            })
            if(checkUser){
                
                done(null,id);
            }else{
                //add new user doc into the collection
                const newUser=await  usermodel.usermodel.create({
                    id:id,
                    Accounts:[]
                })
                newUser.save();
                done(null,id);
            }

        }catch(err){
            console.log(err.message);
        }

            
    }
    )
    )












//only when user is authenticated proprerlu
passport.serializeUser((id,done)=>{
    console.log("inside serializeUser")
    
    //serialise user in req.session.passport.user:id
    done(null,id)
})





//once the user is serialized then only this function is called
passport.deserializeUser(async (id,done)=>{
    console.log("inside deserializeUser")
    try{
        await mongo.connect();
        const checkUser=await usermodel.usermodel.findOne({id:id});
        if(checkUser){
            console.log("user found")
            done(null,id)
        }else{
            done(null,null);
        }
    }catch(error){
        console.log(error.message);
    }
   
})