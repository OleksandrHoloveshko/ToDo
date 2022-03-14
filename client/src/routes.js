import React from "react"
import {Navigate, Route} from "react-router-dom"
import {LinksPage} from "./pages/LinksPage"
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {AuthPage} from "./pages/AuthPage"


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <Route path='/links' exact  element={<LinksPage/>}/>
                <Route path='/create' exact  element={<CreatePage/>}/>
                <Route path='/detail/:id' exact  element={<DetailPage/>}/>
            </>
        )
    }

    return (
        <>
            <Route path='/' exact element={<AuthPage/>}/>
        </>
    )
}