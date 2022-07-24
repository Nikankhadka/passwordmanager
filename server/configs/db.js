const mongoose=require("mongoose");

async function connect(){
    await mongoose.connect("mongodb://localhost/passwordmanager").then(()=>{
        console.log("connected to passwordmanager database")
    }).catch((err)=>{
        // gives error message wrong connection
            console.log(err.message)
    })
}


module.exports={connect};