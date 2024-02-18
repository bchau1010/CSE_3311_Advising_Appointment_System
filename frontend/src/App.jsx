import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom';
import axios from "axios";
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import BackendTest from './pages/BackendTest';
import StudentDashboard from './pages/StudentDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';

//Initialized the default webpage url, 
//so that when we request, we just need the endpoint
axios.defaults.baseURL = 'http://localhost:4000';
// make so that credentials will be send with each request
axios.defaults.withCredentials =true;

function App() {
  return (
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/studentHome' element={<StudentDashboard/>}/>
        <Route path='/advisorHome' element={<AdvisorDashboard/>}/>
        <Route path='/backendtest' element={<BackendTest/>}/>
      
      </Routes>
  )
}

export default App;
