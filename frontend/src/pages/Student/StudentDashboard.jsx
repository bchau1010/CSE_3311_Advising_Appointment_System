
import { Typography } from "@mui/material";
import NavBar from "../../components/NavBar.jsx";
import PersistentDrawerLeft from "../../components/SideBarMUI.jsx";
import StudentTable from "../../components/StudentTable.jsx";
export default function StudentDashboard() {
    const studentNavItems = [
        { text: 'Student Home', link: '/studentHome' },
        // Add more student-specific navigation items here
    ];


    return (
        <>
            <PersistentDrawerLeft
                navItems = {studentNavItems}
                ContextName = "STUDENT HOME"
                dashBoardName = "This is student Dashboard"
                listOfStudentHeader = "This is a list of student">
                <Typography paragraph>LIST OF ALL SUTDENTS</Typography>
                <StudentTable />
            </PersistentDrawerLeft>  

        </>
    );
}
