import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    let navigate = useNavigate()
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)

    let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null)

    let [loading, isLoading] = useState(true)


    let loginUser = async (event) => {
        event.preventDefault()
        let response = await fetch("https://web-production-0d22.up.railway.app/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': event.target.username.value, "password": event.target.password.value })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert("Something went wrong")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        // console.log("token updated")
        let response = await fetch("https://web-production-0d22.up.railway.app/api/token/refresh/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            isLoading(false)
        }
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens,
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }
    })

    useEffect(() => {
        let fiveMin = 1000 * 60 * 5
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fiveMin)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}