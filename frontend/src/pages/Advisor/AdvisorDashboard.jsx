import React from "react";
import NavBar from "../../components/NavBar.jsx";
import PersistentDrawerLeft from "../../components/SideBarMUI.jsx";
import { Typography } from "@mui/material";
import StudentTable from "../../components/StudentTable.jsx";
import AppointmentForm from "../../components/AppointmentForm.jsx";
import { useState } from "react";
// might need to do some connection from Student Table to Appointment form, fetch data 
// from Student table first, then make it available to appointmentform
// need to refactor first?
export default function AllocateTime() {
    const [selectedData, setSelectedData] = useState([]);

    const handleSelect = (data) => {
        setSelectedData(data);
    };

    console.log('AdvisordashBoard:', selectedData);

    return (
        <>
            <PersistentDrawerLeft
                ContextName = "ADVISOR MAKE AN APPOINTMENT"
                dashBoardName = "This is Advisor Dashboard"
                listOfStudentHeader = "This is a list of student">
                <Typography paragraph>LIST OF ALL SUTDENTS</Typography>
                <StudentTable onSelect={handleSelect}/>

                <AppointmentForm
                    selectedData={selectedData}
                    REQUEST_URL = '/advisor/makeAppointment'>
                </AppointmentForm>

            </PersistentDrawerLeft>  
        </>
    );
}
