import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext(null)


export function UserProvider({ children }) {

     const [isAuth, setIsAuth] = useState(false)
     const [role, setRole] = useState('')
     const [userInfo, setUserInfo] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:3030').then((response) => {
               console.log(response.data)
               setIsAuth(response.data.isAuthenticated)
               setRole(response.data.role)
          })
          .catch(err => { console.log(err) })
     }, [])

     // Owner & Client Info
     useEffect(()=> {
          axios.get('http://localhost:3030/api/profile').then(response => {
               setUserInfo(response.data)
               // console.log(response)
          })
     }, [])


     return (
          <>
               <UserContext.Provider value={{isAuth: isAuth, role: role, userInfo: userInfo}}>
                    {children}
               </UserContext.Provider>
          </>
     )
}