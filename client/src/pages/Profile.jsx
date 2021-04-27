import React, { useContext } from "react"
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"
import { UserContext } from "../components/UserContext"

function Profile() {

     const {role, userInfo} = useContext(UserContext)
     
     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

               <div id="page-content-wrapper">
                    <div className="container-fluid">
                         <div className="row">
                              <h1>Profile</h1>
                              <table className="table mt-3">
                                   <tbody>
                                        <tr>
                                             <th>First Name</th>
                                             <td>{userInfo.first_name}</td>
                                        </tr>
                                        <tr>
                                             <th>Last Name</th>
                                             <td>{userInfo.last_name}</td>
                                        </tr>
                                        <tr>
                                             <th>Email</th>
                                             <td>{userInfo.email}</td>
                                        </tr>
                                        <tr>
                                             <th>CIN</th>
                                             <td>{userInfo.cin}</td>
                                        </tr>
                                        <tr>
                                             <th>Phone Number</th>
                                             <td>{userInfo.phone}</td>
                                        </tr>
                                        {role === 'Client' ? 
                                        <tr>
                                             <th>Global Tries</th>
                                             <td>{userInfo.global_tries}</td>
                                        </tr>
                                        :
                                        <tr>
                                             <th>RIB</th>
                                             <td>{userInfo.rib}</td>
                                        </tr> }
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>

          </div>
          </>
     )
}

export default Profile