import React, { useState } from 'react'
import axios from 'axios'


function AddCar() {
     const [registrationNumber, setRegistrationNumber] = useState('')
     const [name, setName]    = useState('')
     const [mark, setMark]    = useState('')
     const [color, setColor]  = useState('')
     const [price, setPrice]  = useState(0)
     const [fuel, setFuel]    = useState('')

     const carInfo = {
          registrationNumber: registrationNumber,
          name: name,
          mark: mark,
          color: color,
          price: price,
          fuel: fuel,
     }
     const addCar = () => {
          axios.post('http://localhost:3030/api/addcar', carInfo).then(()=>{
               console.log('Data Inserted!')
          })
          .catch((error) => { console.log(error)})
     }

     return (
          <>
          <div className="modal fade" id="addProduct" tabIndex="-1">
               <div className="modal-dialog">
               <div className="modal-content">
                    {/* HEADER BOX */}
                    <div className="modal-header">
                         <h5 className="modal-title" id="exampleModalLabel">Add new product</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                         </button>
                    </div>
                    {/* BODY BOX */}
                    <div className="modal-body">



                         <form>
                         <div className="form-group">
                              <label htmlFor="registration_number">Registration Number</label>
                              <input type="text" className="form-control" id="registration_number" onChange={(e) => { setRegistrationNumber(e.target.value) }}/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input type="text" className="form-control" id="name" onChange={(e)=> setName(e.target.value)}/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="mark">Mark</label>
                              <input type="text" className="form-control" id="mark" onChange={(e)=> setMark(e.target.value)}/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="color">Color</label>
                              <input type="text" className="form-control" id="color" onChange={(e)=> setColor(e.target.value)}/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="price">Price</label>
                              <input type="number" className="form-control" id="price" onChange={(e)=> setPrice(e.target.value)}/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="fuel">Fuel</label>
                              <input type="text" className="form-control" id="fuel" onChange={(e)=> setFuel(e.target.value)}/>
                         </div>

                         {/* <div className="form-group">
                              <label htmlFor="fuel">Fuel</label>
                              <select className="custom-select" id="fuel" required>
                                   <option>Fuel...</option>
                                   <option value="Diesel">Diesel</option>
                                   <option value="Essance">Essance</option>
                                   <option value="Electric">Electric</option>
                              </select>
                         </div> */}

                         <button onClick={addCar} type="submit" className="btn btn-primary">Add car</button>
                         </form>




                    </div>
                    {/* FOOTER BOX*/}
                    <div className="modal-footer">
                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
               </div>
               </div>
          </div>
          </>
     )
}


export default AddCar