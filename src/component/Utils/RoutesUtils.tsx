import { Routes, Route } from "react-router-dom"

import LoginPage from "../Pages/LoginPage"
import MainPage from "../Pages/MainPage"
import RegisterPage from "../Pages/RegisterPage"
import BookPage from "../Pages/TablePages/BookPage"
import UserPage from "../Pages/TablePages/UserPage"
import ViewProfilePage from "../Pages/ViewProfilePage"
import DefinitionPage from "../Pages/DefinationPage"

const RoutesUtils = () => 
{
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile" element={<ViewProfilePage/>}/>
            <Route path="/viewBook" element={<BookPage/>}/>
            <Route path="/viewUser" element={<UserPage/>}/>
            <Route path="/defination" element={<DefinitionPage/>}/>
        </Routes>
    )
    
}

export default RoutesUtils