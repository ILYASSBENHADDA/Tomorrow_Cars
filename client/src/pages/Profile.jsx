import React from "react"
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"

function Profile() {
     
     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

               <div id="page-content-wrapper">
                    <div className="container-fluid">
                         <div className="row">
                              <h1>Profile</h1>
                              <button >SEND</button>
                              <table className="table">
                                   <tbody>
                                        <tr>
                                             <th scope="row">Full Name</th>
                                             <td>AZERTY</td>
                                        </tr>
                                        <tr>
                                             <th scope="row">Email</th>
                                             <td>ilyass@mail.com</td>
                                        </tr>
                                        <tr>
                                             <th scope="row">Phone Number</th>
                                             <td>234567890</td>
                                        </tr>
                                        <tr>
                                             <th scope="row">Age</th>
                                             <td>100</td>
                                        </tr>
                                        <tr>
                                             <th scope="row">Address</th>
                                             <td>Tantan</td>
                                        </tr>
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