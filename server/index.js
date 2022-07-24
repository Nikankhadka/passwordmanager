
const express=require("express")
const app=express();
const port=2900;


//main essential imports 
const cors=require("cors")
const cookieParser = require("cookie-parser");
const session=require ("express-session");
const passport = require("passport");
const authroute=require("../server/routes/authroute");
const useroute=require("../server/routes/cruderoute")





//middlware registers 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(session({
    secret:"sessionsecretkey",
    resave:false,
    saveUninitialized:false,
    cookie:{
        //sets the age of cookei to 24 hrs
        maxAge:1000*60*60*24*7
    }
}))
//cookie parse is used to access cookie from headers req.headers.cookie
app.use(cookieParser())
//register the passport and use session
app.use(passport.initialize());
app.use(passport.session())




//register the router if want to add prefix for the end in that route add  ("prefix",route)
app.use(authroute)
app.use("/user/v1",useroute)




//Starting server on given port
app.listen(port,()=>{
    console.log("server is running on port"+port)
})