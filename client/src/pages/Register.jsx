import React, { useState } from 'react'
import Nav from "./partials/Nav"
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {

     const [inputInfo, setinputInfo] = useState({
          firstName: '',
          lastName: '',
          cin: '',
          email: '',
          rib: 0,
          phone: 0,
          password: ''
     })

     const [message, setMessage] = useState('')

     // onChange inputs
     const onChange = (e) => {
          setinputInfo({...inputInfo, [e.target.name]: e.target.value})
     }

     // onSubmit Owner
     const registerOwner = (e) => {
          e.preventDefault()
          axios.post('http://localhost:3030/api/register-onwner', inputInfo).then((response)=> {
               console.log(response)
               setMessage(response.data.message)
          }).catch((error) => { console.log(error)})
     }

     // onSubmit Client
     const registerClient = (e) => {
          e.preventDefault()
          axios.post('http://localhost:3030/api/register-client', inputInfo).then((response)=> {
               console.log(response)
               setMessage(response.data.message)
          }).catch((error) => { console.log(error)})
     }

     return (
          <>
          <Nav/>

          <div className="container">
               <div className="col-lg-8 py-4">
               <h1>Register</h1>

          {/* :::::::::::::::::::::::::::::: */}
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
               <li className="nav-item" role="presentation">
                    <a className="nav-link active" data-toggle="pill" href="#registerOwner" role="tab">Register as publisher</a>
               </li>
               <li className="nav-item" role="presentation">
                    <a className="nav-link" data-toggle="pill" href="#registerClient" role="tab">Register as client</a>
               </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
               {/* REGESTER AS OWNER */}
               <div className="tab-pane fade show active" id="registerOwner" role="tabpanel">
               <form onSubmit={registerOwner}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input type="text" className="form-control" name="firstName" value={inputInfo.firstName} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type="text" className="form-control" name="lastName" value={inputInfo.lastName} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>CIN</label>
                         <input type="text" className="form-control" name="cin" value={inputInfo.cin} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Email address</label>
                         <input type="email" className="form-control" name="email" value={inputInfo.email} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>RIB</label>
                         <input type="Number" className="form-control" name="rib" value={inputInfo.rib} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Phone</label>
                         <input type="Number" className="form-control" name="phone" value={inputInfo.phone} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" name="password" value={inputInfo.password} onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
               </div>

               {/* REGESTER AS CLIENT */}
               <div className="tab-pane fade" id="registerClient" role="tabpanel">
               <form onSubmit={registerClient}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input type="text" className="form-control" name="firstName" value={inputInfo.firstName} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type="text" className="form-control" name="lastName" value={inputInfo.lastName} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>CIN</label>
                         <input type="text" className="form-control" name="cin" value={inputInfo.cin} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Email address</label>
                         <input type="email" className="form-control" name="email" value={inputInfo.email} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Phone</label>
                         <input type="Number" className="form-control" name="phone" value={inputInfo.phone} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" name="password" value={inputInfo.password} onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
               </div>
          </div>
          {/* :::::::::::::::::::::::::::::: */}

          
               <div className="form-text mt-3">You have already account?  <Link to="/login">Log In</Link>.</div>
               </div>
          </div>
          </>
     )
}


export default Register