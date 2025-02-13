import {createContext,useState,useEffect } from "react";
import axios from 'axios'

export const UserContext=createContext(null);

export const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [email,setEmail]=useState(null);
    const [role, setRole]=useState(null)
    useEffect(()=>{
        axios.get('api/auth/profile').then(res=>{
            if (res.data) {
                console.log(res.data)
                setId(res.data.userId);
                setUsername(res.data.username);
                setEmail(res.data.email)
                setRole(res.data.role)
            }
        })
    },[])
    return (
        <UserContext.Provider value={{ username, setUsername, id, setId, email, setEmail, role, setRole }}>
            {children}
        </UserContext.Provider>
    )

} 