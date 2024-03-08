import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from "axios";
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import BackendTest from './pages/BackendTest';
import StudentDashboard from './pages/Student/StudentDashboard';
import AdvisorDashboard from './pages/Advisor/AdvisorDashboard';
import NavBar from './components/NavBar';

//Initialized the default webpage url, 
//so that when we request, we just need the endpoint
axios.defaults.baseURL = 'http://localhost:4000';
// make so that credentials will be send with each request
axios.defaults.withCredentials = true;



//Lead Avisor and Advisor Login
  //Extension of an Advisor
//Advisor Allocate Time Slots 
  //using callendar to display db 
  //click on the date to edit/create new appointment
//Advisor Book Appointments For Student
  //using list of student to display db
  //select a single student to make an appointment for
  //select from available date, time (need a check from db)
  //select reason for the appointment
function App() {
  const location = useLocation();
  const hideNavBarRoutes = ['/studentHome', 'advisorHome'];

  return (

    <>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/backendtest' element={<BackendTest />} />
        <Route path='/studentHome' element={<StudentDashboard />}>
        </Route>
        <Route path='/advisorHome' element={<AdvisorDashboard />}>

        </Route>
      </Routes>

    </>

  )
}

export default App;
