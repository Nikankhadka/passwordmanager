const mongoose=require("mongoose");

async function connect(){
    await mongoose.connect("mongodb+srv://nick11444:nikhildon1@passwordmanager.wafw4zn.mongodb.net/test
").then(()=>{
        console.log("connected to passwordmanager database")
    }).catch((err)=>{
        // gives error message wrong connection
            console.log(err.message)
    })
}


module.exports={connect};
