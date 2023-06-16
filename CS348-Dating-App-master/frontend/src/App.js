
import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Signup from './pages/signup';
import Profiles from './pages/profiles';
import Settings from './pages/settings';
import Home from './pages/home';
import {userContext} from './contexts/userContext';
import Login from './pages/login';
import Conversations from './pages/conversations';
import PlanDate from './pages/plandate';
import DatingHistory from "./pages/datinghistory";

  
function App() {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [first_Name, setFirst_Name] = useState("");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserId = localStorage.getItem("userid");
    const loggedInUserName = localStorage.getItem("firstName");
    setUserId(loggedInUserId);
    setUser(loggedInUser);
    setFirst_Name(loggedInUserName);
  }, [user, userId, first_Name]);
  const value = {user, setUser, userId, setUserId, first_Name, setFirst_Name}

return (
    <userContext.Provider value={value}>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/profiles' element={<Profiles/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/conversations' element={<Conversations/>} />
            <Route path='/datinghistory' element={<DatingHistory/>} />
            <Route path='/plandate' element={<PlanDate/>} />
        </Routes>
      </Router>
    </userContext.Provider>

);
}

export default App;