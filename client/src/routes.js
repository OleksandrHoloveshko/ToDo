import React from "react"
import {Route} from "react-router-dom"
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
                {/*<Navigate to="/create" exact replace={true} />*/}
            </>
        )
    }

    return (
        <>
            <Route path='/' exact element={<AuthPage/>}/>
            {/*<Navigate  to='/' replace={true} />*/}
        </>
    )
}