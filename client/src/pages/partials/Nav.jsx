import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Nav() {

     const [isAuth, setIsAuth] = useState(false)
     const [role, setRole] = useState('')
     useEffect(()=> {
          axios.get('http://localhost:3030').then((response) => {
               console.log(response.data)
               setIsAuth(response.data.isAuthenticated)
               setRole(response.data.role)
          })
          .catch(err => { console.log(err) })
     }, [])

     return (
          <>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
               <Link to="/" className="navbar-brand">Tomorrow Cars</Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                    <ul className="navbar-nav ml-auto">
                         {isAuth ? <>
                         <li>
                              {role !== 'Client' ?
                              <Link className="nav-link" to="/cars"><i class="fas fa-user  mr-1"></i> Account</Link> :
                              <Link className="nav-link" to="/status-requists"><i class="fas fa-user  mr-1"></i> Account</Link>
                              }
                         </li>
                         <li> 
                              <Link className="nav-link" onClick={()=> {window.location.reload()}} to="/logout"><i className="fas fa-sign-out-alt mr-1"></i>log out</Link> 
                         </li>
                         </> : 
                         <> 
                         <li> 
                              <Link className="nav-link" to="/register">Register</Link> 
                         </li>
                         <li> 
                              <Link className="nav-link" to="/login">Login</Link> 
                         </li>
                         </> }
                    </ul>
               </div>
          </nav> 
          </>
     )
}


export default Nav