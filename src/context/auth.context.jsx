import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const authenticateUser = () => {
        console.log('running')
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            axios.get('http://localhost:3000/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    const user = res.data
                    setIsLoggedIn(true)
                    setIsLoading(false)
                    setUser(user)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoggedIn(false)
                    setIsLoading(false)
                    setUser(null)
                })
        } else {
            setIsLoggedIn(false)
            setIsLoading(false)
            setUser(null)
        }
    }
    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }
    const removeToken = () => {
        localStorage.removeItem('authToken')
    }
    const logOut = () => {
        removeToken()
        authenticateUser()
        navigate('/')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProviderWrapper }

