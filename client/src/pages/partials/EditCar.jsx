import axios from 'axios'
import React, { useState, useEffect } from 'react'


function EditCar() {
     const [registrationNumbere, setRegistrationNumbere] = useState('')

     useEffect(()=> {
          axios.get('http://localhost:3030/read').then((response) => {
          console.log(response.data.registration_number)
          setRegistrationNumbere(response.data.registration_number)
          })
     }, [])

     return (
          <>
          <div className="modal fade" id="EditCar" tabIndex="-1">
               <div className="modal-dialog">
               <div className="modal-content">
                    {/* HEADER BOX */}
                    <div className="modal-header">
                         <h5 className="modal-title" id="exampleModalLabel">Edit Car</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                         </button>
                    </div>
                    {/* BODY BOX */}
                    <div className="modal-body">



                         {/* <form> */}
                         <div className="form-group">
                              <label>Registration Number</label>
                              <input type="text" className="form-control" value={registrationNumbere} onChange={(e) => { setRegistrationNumbere(e.target.value) }}/>
                         </div>


                         <button type="submit" className="btn btn-primary">Add car</button>
                         {/* </form> */}



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


export default EditCar