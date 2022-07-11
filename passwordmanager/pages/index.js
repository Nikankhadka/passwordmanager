


import {useForm} from "react-hook-form"
import Userform from "../component/userform";


export default function Loginpage(){

  //using useform hook from the react hook form rgiter function handlesumnmit and errors funtion
  const{register,handleSubmit,formState:{errors}}=useForm();
 
  function login(formdata){
    console.log(formdata)
  }



  function registeruser(formdata){
    console.log(formdata)
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
            <a className="s-btn"> Google</a>
            <a className="s-btn">Facebook</a>
            
          </div>
      </div>




    </div>


  )
}