import React from "react";
import PersistentDrawerLeft from "../../../components/SideBarMUI.jsx";
import { Typography } from "@mui/material";
import StudentTable from "../../../components/StudentTable.jsx";
import AppointmentForm from "../../../components/AppointmentForm.jsx";
import NavBar from "../../../components/NavBar.jsx";
export default function MakeAppointment() {
    return (
        <>
            <PersistentDrawerLeft
                ContextName = "ADVISOR MAKE APPOINTMENT"
                listOfStudentHeader = "This is a list of student">
                <Typography paragraph>LIST OF ALL SUTDENTS</Typography>
                <StudentTable />
                <AppointmentForm></AppointmentForm>
            </PersistentDrawerLeft>  
        </>
    );
}
