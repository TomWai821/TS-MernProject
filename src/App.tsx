import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavNar from './component/NavBar';
import Login from './component/Login'
import Register from './component/Register'
import MainPage from './component/MainPage';
import ViewProfile from './component/ViewProfile';

const App: React.FC = () => 
{
    return (
        <div className="App">
            <NavNar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<ViewProfile/>}/>
                </Routes>
        </div>
    );
}

export default App;
