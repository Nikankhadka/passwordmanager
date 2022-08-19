
import {useState,useEffect} from 'react'
import{useForm} from 'react-hook-form'

//import component 1 at a time 
import Userform from '../component/userform';
import axios from 'axios'
import * as authfunctions from"../component/authenticatepage"


function Accounts(){


//    used unique id baseed rendering so that while mapping a  single state would not generate form for all account
//since to render the form id and the id in the form index must match
    const [accountstate,setaccountstate]=useState("")
    const[er,seteror]=useState(false);
    const nik=["nikan","khadka","rudara","khadka"]



    function editaccount(formdata){
        console.log(formdata)
        if(formdata.account==""&&formdata.password==""){
            seteror(true)
        }else{
            console.log("one of the data will be updated")
        }

    }

    return(
        <div className="accounts">
            {
                nik.map((item)=>{
                    return(
                        <div className="accountholder">

                        <div className="content-box">
                            <div className="account">
                            <h3>Account:...............................................</h3>
                            <p>Password:{item}</p>
                            </div>
                            <div className="btns">
                            <button className="btnn-1" value="asdfasdf" onClick={()=>{
                                    setaccountstate(item)   
                            }}>Edit</button>
                            <button className="btnn-2"> Delete</button>
                            </div>
                           
                        </div>
                     {/* conditoanlly redndering the form component */}
                     {accountstate==item? <Userform  btn1="Edit" fnbtn1={editaccount} btn2="Cancel" setaccountstate={setaccountstate}  seteror={er} input={false}   />:console.log("dont render shit")}

                     </div>
                     
                     )
                        
                        
                })
                
            }

           
           

             </div>
        
        
        )
}




function Addaccount(){

    //state for components that are going to be loaded
const[accountstate,setaccountstate]=useState("")


// initial add accounty
     function AddaccountBtn() {
        return(<button className='addcnt' onClick={()=>{
            setaccountstate("form")
        }}> Add Account</button>)
        }




          //get form data and save account information in db 
          function saveAccount(formdata){
            console.log(formdata)
          }
           


// add account form
    function Accountform(){
        return(
    <div className="formbox">
        <Userform   input={true}  btn1="Save Account"  fnbtn1={saveAccount}  btn2="Cancel"  setaccountstate={setaccountstate} />
      
    </div>)}


        
        

// main ui which is rendered
    return(
        
        <div className="holder">
            {/* using state conditional rendring to render local component */}
            { accountstate==""? <AddaccountBtn/>:<Accountform/>}  
        </div>
         
        
        )
}



export default function Userpage(){
    //in this case the auth state must be false to be access login page
  const [auth,setauth]=useState(false)
const[user,setuser]=useState("")

  function checkauth(result){
     //getting the response from the auth functions then rendering the component or redirecting accordingly
    
     console.log(result)
     if(result){
    setuser(result)
       setauth(true)
      
     }else{
       alert("please login to acces the page");
       window.location.href="http://localhost:3000"
      
     }
 
  }

  useEffect(()=>{
   authfunctions.authenticate(checkauth);
  },[])


  return(

    <div>
        {/* only render the user component if the auth is valid else blank and redirect */}
        {auth&&<Usercomponent user={user}/>}
    </div>
  )



}



 function Usercomponent(props){

    
    //main component return 
    return(
        <div className="userbody">
          
            <h1> welcome back {props.user}</h1>

           <div className="first-box">

            <Accounts/>
            <Addaccount/>
            <button className="addcnt" onClick={(e)=>{

                axios.delete("http://localhost:2900/logout",{withCredentials:true}).then((res)=>{
                    res.data?window.location.href="http://localhost:3000":alert("logout unsuccessful")
                }
                ).catch((error)=>{
                    console.log(error)
                })
            }}>Logout</button>
           </div>

        </div>
        
        
        )
}