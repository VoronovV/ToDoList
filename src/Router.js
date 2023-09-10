import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Authentication from "./pages/Authentication/Authentication";
import Login from "./pages/Login/Login";
import Registration from "./pages/ Registration/ Registration";
import DayPage from "./pages/DayPage/DayPage";

const Router =  () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<App/>} path='/calendar'/>
                <Route element={<Authentication/>} path='/'/>
                <Route element={<Login/>} path='/login'/>
                <Route element={<Registration/>} path='/registration'/>
                <Route element={<DayPage/>} path='/dayPage'/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;