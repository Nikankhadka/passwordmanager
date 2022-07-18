const passport=require("passport");

//import classes of the strategy to setup
const {Strategy}=require("passport-local");




//setup the strategy
passport.use(
    //takes in instance of the strategy we can define object outside the function and pass the object or directly use new to create obj and pass

    new Strategy({
        //by default the strategy takes email and password for input if want to change that pass in the options
       
    },
    //the callback function automatically takes in the input passed in the body of the request
    (username,password,done)=>{
        console.log(username,password)
        done(null,username)
    })



)
passport.serializeUser((id,done)=>{
    console.log("inside serializeUser")
    //this is all we need to do here 
    //serialise user in req.session.passport.user:id
    done(null,id)
})

passport.deserializeUser((id,done)=>{
    console.log("deserialize user")
    //here we need to verify user once more so that the session obj has not been messed around
    // db.find(id)
    //once done then 
    done(null,id)
    //gets the user id from the passport then attaches the user to req.user enabling to use other function from passport
})