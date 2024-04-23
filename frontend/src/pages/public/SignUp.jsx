import NavBar from "../../components/NavBar.jsx";
import SignUpForm from "../../components/SignUpForm.jsx";

export default function SignUp (){
    return(
        <>
        <NavBar/>
        <SignUpForm
        URL = "/student/register"
        header = "Student Sign up"
        isAdvisor = {false}/>
        

        <SignUpForm
        URL = "/advisor/register"
        header = "Advisor Sign up"
        isAdvisor = {true}/>
        </>
    );
}
