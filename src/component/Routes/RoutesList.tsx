import { FC } from "react"
import { Routes, Route } from "react-router-dom"

// Another Pages
import LoginPage from "../Pages/LoginPage"
import MainPage from "../Pages/MainPage"
import RegisterPage from "../Pages/RegisterPage"
import BookPage from "../Pages/TablePages/BookPage"
import UserPage from "../Pages/TablePages/UserPage"
import ViewProfilePage from "../Pages/ViewProfilePage"
import DefinitionPage from "../Pages/TablePages/DefinitionPage"
import SelfLoanRecordPage from "../Pages/TablePages/SelfRecordPage"

import { PagesInterface } from "../../Model/TablePagesAndModalModel"
import ContactPage from "../Pages/TablePages/ContactPage"

const RoutesList:FC<PagesInterface> = (loginData) => 
{
    const {role, isLoggedIn, isAdmin, avatarUrl, status} = loginData;

    return(
        <Routes>
            <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile" element={<ViewProfilePage/>}/>
            <Route path="/viewBook" element={<BookPage role={role} isLoggedIn={isLoggedIn} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status}/>}/>
            <Route path="/viewUser" element={<UserPage role={role} isLoggedIn={isLoggedIn} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status}/>}/>
            <Route path="/records" element={<SelfLoanRecordPage isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}/>
            <Route path="/defination" element={<DefinitionPage role={role} isLoggedIn={isLoggedIn} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status}/>}/>
            <Route path="/contact" element={<ContactPage isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}/>
        </Routes>
    )
    
}

export default RoutesList