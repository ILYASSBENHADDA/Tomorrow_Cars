import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/404'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Cars from '../pages/Cars'
import Edit from '../pages/Edit'
import Single from '../pages/Single'
import Logout from '../pages/Logout'
import axios from 'axios'
import CarRequists from '../pages/CarRequists'
import StatusCarReq from '../pages/StatusCarReq'
// Protected Routes
import ProtectedAuthRouter from './ProtectedAuthRouter'
import ProtectedOnwerRouter from './ProtectedOnwerRouter'
import ProtectedClientRouter from './ProtectedClientRouter'


function Routes() {
     const [isAuth, setIsAuth] = useState(false)
     const [role, setRole] = useState('')


     useEffect(async ()=> {
          try {
               const response = await axios.get('http://localhost:3030')
               if(response) {
                    console.log(response.data) 
                    setIsAuth(response.data.isAuthenticated)
                    setRole(response.data.role)
               }
          } catch (error) {
               error && console.log(error.response)
          }
     })

     
     return (
          <div>
               <Router>
                    <Switch>
                         {/* <Route path="/login" component={Login}/> */}
                         {/* <Route exact path="/status-requists" component={StatusCarReq}/> */}
                         {/* <Route exact path="/cars" component={Cars}/> */}
                         {/* <Route exact path="/register" component={Register}/> */}
                         {/* <Route exact path="/requists" component={CarRequists}/> */}
                         {/* <Route exact path="/edit=:id" component={Edit}/> */}



                         <Route exact path="/" component={Home}/>
                         <Route exact path="/item=:id" component={Single}/>
                         <Route path="/logout" component={Logout}/>

                         {/* Auth Routes */}
                         <ProtectedAuthRouter path="/login" component={Login} isAuth={isAuth} />
                         <ProtectedAuthRouter path="/register" component={Register} isAuth={isAuth} />

                         {/* Owner Routes */}
                         <ProtectedOnwerRouter path="/cars" component={Cars} isAuth={isAuth} role={role} />
                         <ProtectedOnwerRouter path="/requists" component={CarRequists} isAuth={isAuth} role={role} />
                         <ProtectedOnwerRouter path="/edit=:id" component={Edit} isAuth={isAuth} role={role} />

                         {/* Client Routes */}
                         <ProtectedClientRouter path="/status-requists" component={StatusCarReq} isAuth={isAuth} role={role} />

                         


                         <Route exact path="/dashboard" component={Dashboard}/>
                         <Route exact path="/profile" component={Profile}/>
                         <Route exact path="/404" component={NotFound}/>
                         <Redirect to="/404" />
                    </Switch>
               </Router>
          </div>
     )
}


export default Routes