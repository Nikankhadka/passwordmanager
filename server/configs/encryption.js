//module to encrypt and decrpty the password of the account stored in the database
//using crypto  aes encryption library and alogrithm

const aes256=require("aes256")

//function to encrypt text

function encrypt(text){
    console.log("encrypting")
    //first encrypt and convert into string
    const encryptedtext=aes256.encrypt("secretkey",text)
    console.log(encryptedtext)
    //return the encrypted text
    return encryptedtext;
}

 function decrypt(encryptedtext){
    console.log("decrypting");
    const decryptedtext=aes256.decrypt("secretkey",encryptedtext)
    console.log(decryptedtext)
    return decryptedtext;
}

module.exports={encrypt,decrypt}