import React from "react";
import NavBar from "../../../components/NavBar.jsx";
import PersistentDrawerLeft from "../../../components/SideBarMUI.jsx";
import { Typography } from "@mui/material";
import { useState } from "react";
import CalendarDemo from "../../../components/Calendar.jsx";
// might need to do some connection from Student Table to Appointment form, fetch data 
// from Student table first, then make it available to appointmentform
// need to refactor first?
export default function AllocateTimeSlot() {

    return (
        <>
            <PersistentDrawerLeft
                ContextName = "ADVISOR ALLOCATE TIME SLOT">
                <CalendarDemo></CalendarDemo>
            </PersistentDrawerLeft>  
        </>
    );
}
