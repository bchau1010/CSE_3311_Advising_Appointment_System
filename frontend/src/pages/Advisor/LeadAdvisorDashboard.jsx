import React from "react";
import NavBar from "../../components/NavBar.jsx";
import PersistentDrawerLeft from "../../components/SideBarMUI.jsx";
import { Typography } from "@mui/material";
import StudentTable from "../../components/StudentTable.jsx";

export default function LeadAdvisorDashboard() {
    return (
        <>
            <PersistentDrawerLeft
                ContextName="LEAD ADVISOR HOME"
                dashBoardName="This is Lead Advisor Dashboard"
                listOfStudentHeader="This is a list of student">
                <Typography paragraph>LIST OF ALL SUTDENTS</Typography>
                <StudentTable />
            </PersistentDrawerLeft>
        </>


    );
}
