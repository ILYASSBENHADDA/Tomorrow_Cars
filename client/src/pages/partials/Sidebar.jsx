import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Sidebar() {

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
          <div id="sidebar-wrapper">
               <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                         <Link to="/"> Manage Account </Link>
                    </li>
                    {role == 'Owner' ? <>
                    <li>
                         <Link to="/cars">Cars List</Link>
                    </li>
                    <li>
                         <Link to="/requists">Cars requists</Link>
                    </li>
                    
                    </>:

                    <li>
                         <Link to="/status-requists">Status Requists</Link> 
                    </li>
                    }
                    
                    
               </ul>
          </div>
          </>
     )
}


export default Sidebar