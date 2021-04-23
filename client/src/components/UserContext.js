import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)


export function UserProvider({ children }) {

     const [isAuth, setIsAuth] = useState(false)
     const [role, setRole] = useState('')

     useEffect(()=> {
          axios.get('http://localhost:3030').then((response) => {
               console.log(response.data)
               setIsAuth(response.data.isAuthenticated)
               setRole(response.data.role)
          })
          .catch(err => { console.log(err) })
     }, [])


     return (
          <>
               <UserContext.Provider value={{isAuth: isAuth, role: role}}>
                    {children}
               </UserContext.Provider>
          </>
     )
}



// export const UserRole = createContext(null)


// export function useGlobalV() {
//      return useContext(UserRole)
// }


// export function UserProvider({ children }) {

//      const [role, setRole] = useState('')
//      setRole('owner')


//      return (
//           <>
//                <UserRole.Provider value={role}>
//                     {children}
//                </UserRole.Provider>
//           </>
//      )
// }