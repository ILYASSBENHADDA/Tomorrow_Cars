import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"
import AddCar from "./partials/AddCar"
import { Link } from "react-router-dom"

function Cars() {
     const [carList, setCarList] = useState([])
     
     useEffect(()=> {
          axios.get('http://localhost:3030/api/read-owner').then(response => {
               setCarList(response.data)
               console.log(response)
          })
     }, [])


     const deleteCar = (id) => {
          const ask = window.confirm('Are sure you want to delete this item?')
          if (ask === true) {
               axios.delete(`http://localhost:3030/api/delete/${id}`).then(()=> {
                    window.location.replace("/cars")
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
                    <h1>Products</h1>
                    {/* Add New Product */}
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addProduct"> Add New </button>
                    <AddCar/>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Place</th>
                                   <th>Registration Plate</th>
                                   <th>Name</th>
                                   <th>Mark</th>
                                   <th>Color</th>
                                   <th>Price(DHs)</th>
                                   <th>Fuel</th>
                                   <th>Is Saled</th>
                                   <th>Actions</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {carList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.id_place.place_number}</th>
                                        <td>{val.id_car.registration_number}</td>
                                        <td>{val.id_car.name}</td>
                                        <td>{val.id_car.mark}</td>
                                        <td>{val.id_car.color}</td>
                                        <td>{val.id_car.price}</td>
                                        <td>{val.id_car.fuel}</td>
                                        <td>{val.id_car.is_saled ? "SALED" : "INSTOCK"}</td>
                                        <td>
                                             <button onClick={()=>{deleteCar(val.id_car._id)}} className="btn btn-secondary sm mr-1"><i className="far fa-trash-alt"></i></button>
                                             <Link to={`/edit=${val.id_car._id}`} className="btn btn-secondary sm"><i className="far fa-edit"></i></Link>
                                        </td>
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

export default Cars