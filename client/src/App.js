import React, { useContext } from "react"
import Routers from "./routes/Routes"
import './App.css'
import { UserContext, UserProvider } from "./components/UserContext"
import { Index }from "./components/Index"
function App() {
  
  return (
    <>
      <UserProvider>
        {/* <useGlobalV> */}
          {/* <h1>Hello</h1>
          <Index/> */}
        {/* </useGlobalV> */}
        <Routers></Routers>
      </UserProvider>
    </>
  )
}

export default App