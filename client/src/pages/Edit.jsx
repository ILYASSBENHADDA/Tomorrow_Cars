import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"
// import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";


function Edit() {

     const { id } = useParams()
     const [oneCar, setOneCar] = useState({
          registration_number: '',
          name: '',
          mark: '',
          color: '',
          price: '',
          fuel: ''
     })

     const { registration_number, name, mark, color, price, fuel } = oneCar
     const onChange = (e) => {
          setOneCar({...oneCar, [e.target.name]: e.target.value})
     }
     
     useEffect(()=> {
          axios.get(`http://localhost:3030/api/edit/${id}`).then(response => {
               setOneCar(response.data)
          })
     }, [id])

     const updateCar = (id) => {
          axios.put('http://localhost:3030/api/edit', {
               id: id,
               registration_number: registration_number,
               name: name,
               mark: mark,
               color: color,
               price: price,
               fuel: fuel,
          })
     }




     
     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1 className="mb-5">Update</h1>

                    <div className="row">



                         <div className="col-sm">
                         <div className="form-group">
                              <label>Registration Number</label>
                              <input type="text" className="form-control" name="registration_number" value={oneCar.registration_number} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Name</label>
                              <input type="text" className="form-control" name="name" value={oneCar.name} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Mark</label>
                              <input type="text" className="form-control" name="mark" value={oneCar.mark} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Color</label>
                              <input type="text" className="form-control" name="color" value={oneCar.color} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Price</label>
                              <input type="number" className="form-control" name="price" value={oneCar.price} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Fuel</label>
                              <input type="text" className="form-control" name="fuel" value={oneCar.fuel} onChange={onChange} />
                         </div>


                         <button onClick={()=> { updateCar(id) }} className="btn btn-primary">Update car</button>
                         </div>

                    </div>
               </div>
          </div>
          </div>
          </>
     )
}

export default Edit