import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"
import { Link } from "react-router-dom"

function TryCar() {
     const [triesList, setTriesList] = useState([])
     
     useEffect(()=> {
          axios.get('http://localhost:3030/api/get-try-car').then(response => {
               setTriesList(response.data)
               console.log(response)
          })
     }, [])

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Try Car List</h1>
                    {/* <h1>{confirm ? 'True' : 'False'}</h1> */}

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Client Name</th>
                                   <th>Car Mark</th>
                                   <th>Origin Price(DHs)</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {triesList.map((val, key) => (
                                   <tr key={key}>
                                        <td>{val.id_car.fuel}</td>
                                        <td><Link to={`/item=${val.id_car._id}`}> {val.id_car.mark} </Link></td>
                                        <td>{val.id_car.price}</td>                                        
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

export default TryCar