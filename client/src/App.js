import React from "react"
import './App.css'
import 'materialize-css'
import {BrowserRouter as Router, Routes} from "react-router-dom"
import {useRoutes} from "./routes"

function App() {
    const routes = useRoutes(false)
    return (
        <Router>
            <Routes>
                {routes}
            </Routes>
        </Router>
    );
}

export default App;
