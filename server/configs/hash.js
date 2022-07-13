const bcrypt=require("bcrypt");

async function hashpassword(password){
    //since we need async fucntion bycpt comes with promise and callback but better to use async 
    const hashedpassword=await bcrypt.hash(password,10);
    return hashedpassword;
}

async function comparepassword(password,hashedpassword){
    //pass the password and hashed password compares using the signature to check if it is tru
    const result=await bcrypt.compare(password,hashedpassword);
    return result;
}


//export both of the function
module.exports={hashpassword,comparepassword};