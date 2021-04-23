import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"
import { Link } from "react-router-dom"

function CarRequists() {
     const [reqList, setReqList] = useState([])
     let confirm = true;
     
     useEffect(()=> {
          axios.get('http://localhost:3030/api/car-requist').then(response => {
               setReqList(response.data)
               console.log(response)
          })
     }, [])

     const validReq =  (id) => {
          const ask = window.confirm('Are you want to accept this requist?')
          if (ask === true) {
               axios.post('http://localhost:3030/api/confirm-requist', {id, confirm}).then(()=> {
                    window.location.reload()
                    return console.log('OK')
               })
          }
     }

     const refuseReq = (id) => {
          confirm = false
          const ask = window.confirm('Are you want to refuse this requist?')
          if (ask === true) {
               axios.post('http://localhost:3030/api/confirm-requist', {id,confirm }).then(()=> {
                    window.location.reload()
                    return console.log('OK')
               })
          }
     }

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Car requists</h1>
                    {/* <h1>{confirm ? 'True' : 'False'}</h1> */}

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Client Name</th>
                                   <th>Car Mark</th>
                                   <th>Rroposed Reduction(%)</th>
                                   <th>Origin Price(DHs)</th>
                                   <th>Price with reduction(DHs)</th>
                                   <th>Confirm</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {reqList.map((val, key) => (
                                   <tr key={key}>
                                        <td>{val.id_client.first_name}</td>
                                        <td><Link to={`/item=${val.id_car._id}`}> {val.id_car.mark} </Link></td>
                                        <td>{val.proposed_reduction}</td>
                                        <td>{val.id_car.price}</td>
                                        <th>{(val.id_car.price / 100) * (100 - val.proposed_reduction)}</th>
                                        {/* <td> <button onClick={()=>{validReq(val._id)}} className="btn btn-secondary sm">OK</button> <button onClick={()=>{refuseReq(val._id)}} className="btn btn-secondary sm">NO</button> </td> */}
                                        
                                        <th> {val.is_accepted == null ? <> <button onClick={()=>{validReq(val._id)}} className="btn btn-secondary sm">OK</button> <button onClick={()=>{refuseReq(val._id)}} className="btn btn-secondary sm">NO</button> </> : (val.is_accepted ? (<div style={{ color: 'green' }}> Validated </div>) : null) }</th>
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

export default CarRequists