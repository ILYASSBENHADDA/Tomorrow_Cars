import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from "./partials/Nav"
import { Link } from "react-router-dom"
import Sidebar from './partials/Sidebar'


function StatusCarReq() {
     const [reqlist, setReqlist] = useState([])

     useEffect(() => {
          axios.get('http://localhost:3030/api/car-requist').then(response => {
               console.log(response)
               setReqlist(response.data)
          })
     }, [])


     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
               <h1>Status car requists</h1>

               <div className="row">     
                    <table className="table mt-4">
                         {/* Header Table */}
                         <thead className="thead-dark">
                         <tr>
                              <th>Car Mark</th>
                              <th>Rroposed Reduction(%)</th>
                              <th>Origin Price(DHs)</th>
                              <th>Price with reduction(DHs)</th>
                              <th>Status</th>
                         </tr>
                         </thead>

                         {/* Body Table */}
                         <tbody>

                         {reqlist.map((val, key) => (
                              <tr key={key}>
                                   <td><Link to={`/item=${val.id_car._id}`}> {val.id_car.mark} </Link></td>
                                   <td>{val.proposed_reduction}</td>
                                   <td>{val.id_car.price}</td>
                                   <th>{(val.id_car.price / 100) * (100 - val.proposed_reduction)}</th>
                                   <th>{ val.is_accepted == null ? (<div style={{ color: 'orange' }}> Panding... </div>) : (val.is_accepted ? (<div style={{ color: 'green' }}> Valid Requist </div>) : (<div style={{ color: 'red' }}> Refuse Requist </div>)) }</th>
                              </tr>
                         ))}

                         </tbody>
                    </table>
               </div>
               </div>
          </div>
          </div>
          </>
     )
}

export default StatusCarReq