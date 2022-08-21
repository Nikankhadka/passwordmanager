
import axios from 'axios'

 export async function authenticate(checkauth){
    console.log("checking if user is logged in")
const response=await axios.get("http://localhost:2900/authenticate",{withCredentials:true})
    console.log(response.data)
const result=await response.data
//passed the callback function 
checkauth(result);
    
}