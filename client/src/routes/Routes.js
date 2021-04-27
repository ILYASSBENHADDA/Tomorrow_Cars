import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import NotFound from '../pages/404'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Cars from '../pages/Cars'
import Edit from '../pages/Edit'
import Single from '../pages/Single'
import Logout from '../pages/Logout'
import CarRequists from '../pages/CarRequists'
import StatusCarReq from '../pages/StatusCarReq'
// Protected Routes
import ProtectedAuthRouter from './ProtectedAuthRouter'
import ProtectedOnwerRouter from './ProtectedOnwerRouter'
import ProtectedClientRouter from './ProtectedClientRouter'
// User Context API
import { UserContext } from "../components/UserContext"
import TryCar from '../pages/TryCar'

function Routes() {
     const {role, isAuth} = useContext(UserContext)

     
     return (
          <div>
               <Router>
                    <Switch>

                         {/* Global Routes */}
                         <Route exact path="/" component={Home}/>
                         <Route exact path="/item=:id" component={Single}/>
                         <Route path="/logout" component={Logout}/>

                         {/* Auth Routes */}
                         <ProtectedAuthRouter path="/login" component={Login} isAuth={isAuth} />
                         <ProtectedAuthRouter path="/register" component={Register} isAuth={isAuth} />
                         <ProtectedAuthRouter path="/profile" component={Profile} isAuth={!isAuth} />

                         {/* Owner Routes */}
                         <ProtectedOnwerRouter path="/cars" component={Cars} isAuth={isAuth} role={role} />
                         <ProtectedOnwerRouter path="/requists" component={CarRequists} isAuth={isAuth} role={role} />
                         <ProtectedOnwerRouter path="/edit=:id" component={Edit} isAuth={isAuth} role={role} />

                         {/* Client Routes */}
                         <ProtectedClientRouter path="/status-requists" component={StatusCarReq} isAuth={isAuth} role={role} />
                         <ProtectedClientRouter path="/try-car" component={TryCar} isAuth={isAuth} role={role} />

                         <Route exact path="/404" component={NotFound}/>
                         <Redirect to="/404" />
                    </Switch>
               </Router>
          </div>
     )
}


export default Routes