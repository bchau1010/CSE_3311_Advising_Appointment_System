
import AppointmentPicker from "../../components/AppointmentPicker.jsx";
import NavBar from "../../components/NavBar.jsx";
import PersistentDrawerLeft from "../../components/SideBarMUI.jsx";

export default function StudentDashboard() {
    return (
        <>
            <PersistentDrawerLeft
            ContextName = "STUDENT HOME"
            dashBoardName = "This is student Dashboard"
            listOfStudentHeader = "This is a list of student"
            />

        </>
    );
}
