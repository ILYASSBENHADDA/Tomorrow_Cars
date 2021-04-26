import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../components/UserContext"


function Sidebar() {

     const { role } = useContext(UserContext)

     return (
          <>
          <div id="sidebar-wrapper">
               <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                         <Link to="/"> Manage Account </Link>
                    </li>
                    {role === 'Owner' ? <>
                    <li>
                         <Link to="/cars">Cars List</Link>
                    </li>
                    <li>
                         <Link to="/requists">Cars requists</Link>
                    </li>
                    
                    </>:
                    <>
                    <li>
                         <Link to="/profile">Profile</Link> 
                    </li>
                    <li>
                         <Link to="/status-requists">Status Requists</Link> 
                    </li>
                    <li>
                         <Link to="/try-car">Try Car</Link>
                    </li>
                    </>
                    }

               </ul>
          </div>
          </>
     )
}


export default Sidebar