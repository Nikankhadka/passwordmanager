//module to encrypt and decrpty the password of the account stored in the database
//using crypto  aes encryption library and alogrithm

const CryptoJs=require("crypto-js")

//function to encrypt text

async function encrypt(text){
    console.log("encrypting")
    //first encrypt and convert into string
    const encryptedtext=await CryptoJs.AES.encrypt(text,"secretecncryptionkey").toString();
    //return the encrypted text
    return encryptedtext;
}

 function decrypt(text){
    console.log("decrypting");
    const bytes= CryptoJs.AES.decrypt(text,"secretecncryptionkey");
    console.log(bytes)
    const decryptedtext=bytes.toString(CryptoJs.enc.Utf8);
    console.log(decryptedtext)
    return decryptedtext;
}

module.exports={encrypt,decrypt}