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
import LeadAdvisorDashboard from './pages/Advisor/LeadAdvisorDashboard';

import RequireAuth from './context/RequireAuth';
import Unauthorized from './pages/AuthRedirect/Unauthorized';
import PageNotFound from './pages/AuthRedirect/PageNotFound';

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
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/backendtest' element={<BackendTest />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        

        {/*all of these routes need to be wrap around a authProvider
          The roles need to match for each
          then we can do nested routes inside
        */}
        {/*Make it so that the authorization for each is required  */}
        <Route element={<RequireAuth allowedRoles={[1]} />}>
          <Route path='/studentHome' element={<StudentDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2]} />}>
          <Route path='/advisorHome' element={<AdvisorDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[3]} />}>
          <Route path='/leadAdvisorHome' element={<LeadAdvisorDashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>

  )
}

export default App;
