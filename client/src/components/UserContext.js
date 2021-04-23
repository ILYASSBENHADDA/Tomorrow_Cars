import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)


export function UserProvider({ children }) {

     // const [role, setRole] = useState('')
     // setRole('owner')


     return (
          <>
               <UserContext.Provider value={{message: "Hi from context API", test: "Tesla"}}>
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