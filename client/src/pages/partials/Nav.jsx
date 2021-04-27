import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../components/UserContext"


function Nav() {

     const {role, isAuth, userInfo} = useContext(UserContext)


     return (
          <>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
               <Link to="/" className="navbar-brand"><b>TOMORROW CARS</b></Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                    <ul className="navbar-nav ml-auto">
                         {isAuth ? <>
                         <li>
                              {role === 'Owner' ?
                              <Link className="nav-link" to="/cars"><i class="fas fa-user  mr-1"></i>Welcome, <b>{userInfo.first_name}</b></Link> :
                              <Link className="nav-link" to="/status-requists"><i class="fas fa-user  mr-1"></i>Welcome, <b>{userInfo.first_name}</b></Link>
                              }
                         </li>
                         <li> 
                              <Link className="nav-link" onClick={()=> {window.location.reload()}} to="/logout"><i className="fas fa-sign-out-alt mr-1"></i>log Out</Link> 
                         </li>
                         </> : 
                         <> 
                         <li> 
                              <Link className="nav-link" to="/register"><i class="fas fa-user-plus mr-1"></i> Register</Link> 
                         </li>
                         <li> 
                              <Link className="nav-link" to="/login"><i class="fas fa-sign-in-alt mr-1"></i> Log In</Link> 
                         </li>
                         </> }
                    </ul>
               </div>
          </nav> 
          </>
     )
}


export default Nav