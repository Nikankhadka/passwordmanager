


import {useForm} from "react-hook-form"
import axios from "axios";
import { useState,useEffect } from "react";
import * as authfunctions from"../component/authenticatepage.js";

export default function Loginpage(){

  //in this case the auth state must be false to be access login page
  const [auth,setauth]=useState(true)

  function checkauth(result){
     //getting the response from the auth functions then rendering the component or redirecting accordingly
    
     console.log(result)
     if(!result){
       setauth(false)
     }else{
      
        window.location.href="/user"
       console.log("user already logged in ")
     }
 
  }


  useEffect(()=>{
   authfunctions.authenticate(checkauth);
  },[])


  return(
      <div>
        
        {/* if the state is false then the below component will be loaded */}
        {!auth&& <Login/>}
      </div>
    
    )
}



 function Login(){

  //using useform hook from the react hook form rgiter function handlesumnmit and errors funtion
  const{register,handleSubmit,formState:{errors}}=useForm();
 
  function login(formdata){
    console.log("loggin in ")
    console.log(formdata)
    
    axios.post("http://localhost:2900/local-login",{username:formdata.Username,password:formdata.password},{
      withCredentials:true
    }).then((response)=>{
      console.log(response.data)
      if(response.data=="logged in"){
        window.location.href="http://localhost:3000/user"
      }
    }).catch((err)=>{
      console.log(err)
    })
  }



  async function  registeruser(formdata){
      console.log("registering user")
      console.log(formdata)
     
      const response=await axios.post(`http://localhost:2900/register-user`,{username:formdata.Username,password:formdata.password})
      await response.data?alert("user succesfully registered"):alert("user not registered")
  }



  return(

    <div className="body" >

      <div className="loginform">
          <h2 id="head">Login</h2>

          <form >
        <div className="inputdiv">
         <label className="label">UserName: </label>
       <input placeholder="UserName" className="input" {...register("Username",{required:true})} ></input>
       {errors.Username && <p className="p1" >Enter Valid Username</p>}
         </div>
         <div className="inputdiv">
         <label className="label">Password: </label>
       <input placeholder="password" className="input" {...register("password",{required:true})}></input>
       {errors.password && <p className="p1" >Enter Valid Password </p>}
       </div>


       {/* buttons to do work */}
       <div className="logreg">
         <button  className="btn"  onClick={handleSubmit(login)}>Login</button>


         <button className="btn" onClick={handleSubmit(registeruser)}>Register</button>
       </div>

         
     </form>

          <div className="social">
            <a  href="http://localhost:2900/google-login"className="s-btn"> Google</a>
            <a href="http://localhost:2900/facebook-login" className="s-btn">Facebook</a>
            
          </div>
      </div>




    </div>


  )
}