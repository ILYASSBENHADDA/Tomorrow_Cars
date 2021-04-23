import React, { useContext } from "react"
import { UserContext } from "./UserContext"


export function Index() {
     const msg = useContext(UserContext)

     return (
          <>
               <h1>{msg.test}</h1>
          </>
     )
}
