import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Nav from './partials/Nav'
import { UserContext } from "../components/UserContext"


function Single() {
     const {role, isAuth} = useContext(UserContext)

     const { id } = useParams()
     const [oneCar, setOneCar] = useState('')
     const [reduction, setReduction] = useState(0)

     useEffect(()=> {
          axios.get(`http://localhost:3030/api/edit/${id}`).then(response => {
               setOneCar(response.data)
          })
     }, [id])

     // Reserve Car
     const reserveCar = () => {
          const ask = window.confirm('Confirm your reservation!')
          if (ask === true) {
               axios.post('http://localhost:3030/api/reserve-car', {id, reduction}).then(response => {
                    if (response.data.status === 'no') {
                         return alert(response.data.message)
                    } else {
                         alert(response.data.message)
                    }
               })
          }
     }

     // Try Car
     const tryCar = () => {
          const ask = window.confirm('Confirm your try!')
          if (ask === true) {
               axios.post('http://localhost:3030/api/try-car', {id}).then(response => {
                    if (response.data.status === 'no') {
                         return alert(response.data.message)
                    } else {
                         alert(response.data.message)
                    }
               })
          }
     }

     return (
          <>
          <Nav/>
          <div className="container">
          <div className="card">
               <div className="row">
                    {/* <aside className="col-sm-5 border-right">
                         <div className="text-center">
                              <img src="uploads/" />
                         </div>
                    </aside> */}
                    <aside className="col-sm-7">
                         <article className="card-body p-5">
                              <h3 className="title mb-3">{oneCar.name}</h3>
                              <h3 className="text-warning">{oneCar.price} DHs</h3>
                              <dl className="item-property">
                                   <dt>Mark</dt>
                                   <dd><p>{oneCar.mark}</p></dd>
                              </dl>
                              <dl className="param param-feature">
                                   <dt>Color</dt>
                                   <dd>{oneCar.color}</dd>
                              </dl>
                              <dl className="param param-feature">
                                   <dt>Fuel</dt>
                                   <dd>{oneCar.fuel}</dd>
                              </dl>

                              <hr/>
                              <div className="row">
                                   <div className="col-sm-5">
                                        <dl className="param param-inline">
                                             <dt>Proposed Reduction (%): </dt>
                                             <dd>
                                                  <input type="number" className="form-control" min="0" placeholder="0" onChange={(e) => { setReduction(e.target.value) }} style={{width: 70 + 'px'}} />
                                             </dd>
                                        </dl>
                                   </div>
                              </div>
                              <hr/>
                              { (role === 'Owner' || isAuth === false) ?  <h5><i>You have to log-in as client for Reserving Or Trying this Car</i></h5> : 
                              <>
                              <button onClick={()=>{reserveCar()}} className="btn btn-lg btn-secondary mr-3"> RESERVE CAR </button>
                              <button onClick={()=>{tryCar()}} className="btn btn-lg btn-outline-secondary"> TRY CAR </button>
                              </> }
                         </article>
                    </aside>
               </div>
          </div>
          </div>
          </>
     )
}

export default Single