import { useState } from 'react';
import{useForm} from 'react-hook-form'



export default function Userform(props){

    const{register,handleSubmit,formState:{errors}}=useForm();

        


    return(
        
        <form >
        <div className="inputdiv">
         <label className="label">Account: </label>
       <input placeholder="Account" className="input" {...register("account",{required:props.input})} ></input>
       {errors.account && <p className="p1" >Enter Valid Account</p>}
         </div>
         <div className="inputdiv">
         <label className="label">Password: </label>
       <input placeholder="password" className="input" {...register("password",{required:props.input})}></input>
       {errors.password && <p className="p1" >Enter Valid Password </p>}
       </div>

       {props.seteror? <p className="p1">Enter Account/Password</p>:console.log("wait")}
       {/* buttons to do work */}
       <div className="logreg">
         <button  className="btn"  onClick={handleSubmit(props.fnbtn1)}>{props.btn1}</button>


         <button className="btn" onClick={()=>{
          console.log("cancenl ma hai")
          props.setaccountstate("");
         }}>{props.btn2}</button>
       </div>

         
     </form>
        
        )
}