import React,{ createContext,useEffect,useState} from "react";
import { onAuthStateChanged } from "firebase/auth";



 const AuthContext = createContext();

 const AuthContextProvider = ({children})=>{
   const [signState,setSignState] = useState('Sign In');
   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [loading,setLoading] = useState(false)
   const [error,setErrors] = useState({})


   return(
      <AuthContext.Provider
      value={
        {
            signState,
            setSignState,
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            loading,
            setLoading,
            error,
            setErrors
            

        }
      }
      >
        {children}
      </AuthContext.Provider>
     
   )
 }

 export {AuthContext,AuthContextProvider};