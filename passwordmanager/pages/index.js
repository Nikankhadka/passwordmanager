






export default function Loginpage(){


  return(

    <div className="body" >

      <div className="loginform">
          <h2 id="head">Login</h2>
          <form >
           <div className="inputdiv">
            <label className="label">Username: </label>
          <input placeholder="Username" className="input"></input>
            </div>
            <div className="inputdiv">
            <label className="label">Password: </label>
          <input placeholder="password" className="input"></input>
          </div>


          {/* buttons to do work */}
          <div className="logreg">
            <button  className="btn">Login</button>
            <button className="btn">Register</button>
          </div>

          <div className="social">
            <a className="s-btn"> Google</a>
            <a className="s-btn">Facebook</a>
            
          </div>
  
          </form>
      </div>




    </div>


  )
}