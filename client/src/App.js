import React from "react"
import {BrowserRouter as Router, Routes} from "react-router-dom"
import {useRoutes} from "./routes"
import {useAuth} from "./hook/auth.hook"
import {AuthContext} from "./context/AuthContext"
import './App.css'
import 'materialize-css'

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <Router>
                <Routes>
                    {routes}
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
