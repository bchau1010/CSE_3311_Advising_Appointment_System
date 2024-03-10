import { createContext,useState } from "react";


const AuthContext = createContext({})


// children is the components nested inside the AuthProvider
export const AuthProvider = ({children}) =>{
    //this is an object
    const [auth, setAuth] = useState({});

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;