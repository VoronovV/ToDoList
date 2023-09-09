import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Authentication from "./pages/Authentication/Authentication";

const Router =  () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<App/>} path='/calendar'/>
                <Route element={<Authentication/>} path='/'/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;