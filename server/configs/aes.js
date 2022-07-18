//module to encrypt and decrpty the password of the account stored in the database
//using aes encryption library and alogrithm

//import the aes
const AesEncryption=require("aes-encryption");
//create an instance
const aes=new AesEncryption();

//now register secret key
aes.setSecretKey("dsafsdfsdfsdfsdferfffvvbva21233sdvcxvvcxvdsf554368fdg7823423dsfgdsfg7878dfgdsfg");


//function to encrypt text

async function encrypt(text){
    //first encrypt the text 
    const encryptedtext=await aes.encrypt(text);
    //return the encrypted text
    return encryptedtext;
}

async function decrypt(text){
    const decryptedtext=await aes.decrypt(text);
    return decryptedtext;
}