import React, {useState} from 'react'
import Axios from 'axios'
import Nav from "./partials/Nav"
import {Link} from 'react-router-dom'
Axios.defaults.withCredentials = true



function Login() {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const [message, setMessage] = useState('')
     
     const loginInfo = {
          email: email,
          password: password,
     }

     const loginOwner = (e) => {
          e.preventDefault()
          Axios.post('http://localhost:3030/api/login-owner', loginInfo, { withCredentials: true }).then((response) => {
               setMessage(response.data.message)
               console.log(response)
               // Reload page
               setTimeout(()=> { window.location.reload() }, 1000)
          })
          .catch((error) => { console.log(error)})
     }

     const loginClient = (e) => {
          e.preventDefault()
          Axios.post('http://localhost:3030/api/login-client', loginInfo, { withCredentials: true }).then((response) => {
               setMessage(response.data.message)
               console.log(response)
               // Reload page
               setTimeout(()=> { window.location.reload() }, 1000)
          })
          .catch((error) => { console.log(error)})
     }


     return (
          <>
          <Nav/>
          
          <div className="container">
               <div className="col-lg-8 py-4">
               <h1>Login</h1>
          
          {/* ::::::::::::::::::::::::: */}
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
               <li className="nav-item" role="presentation">
                    <a className="nav-link active" data-toggle="pill" href="#loginOwner" role="tab">Login as publisher</a>
               </li>
               <li className="nav-item" role="presentation">
                    <a className="nav-link" data-toggle="pill" href="#loginClient" role="tab">Login as Customer</a>
               </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
               {/* LOGIN  OWNER */}
               <div className="tab-pane fade show active" id="loginOwner" role="tabpanel">
               <form onSubmit={loginOwner}>
                    <div className="form-group">
                         <label>Email address</label>
                         <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                    </div>

                    <button className="btn btn-primary">Login</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
               </div>

               {/* LOGIN  OWNER */}
               <div className="tab-pane fade" id="loginClient" role="tabpanel">
               <form onSubmit={loginClient}>
                    <div className="form-group">
                         <label>Email address</label>
                         <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                    </div>

                    <button className="btn btn-primary">Login</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
               </div>

          </div>
          {/* ::::::::::::::::::::::::: */}

               <div className="form-text mt-3">Don't have an account yet? <Link to="/register">Register</Link>.</div>
               </div>
          </div>
          </>
     )
}

export default Login