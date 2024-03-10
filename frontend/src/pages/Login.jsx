import LoginForm from "../components/LoginForm.jsx";
import NavBar from "../components/NavBar.jsx";

export default function Login (){
    return(
        <>
        <NavBar/>
        <LoginForm
        LOGIN_URL = '/student/login'
        loginHeader = 'Student Login'
        redirectURL = '/studentHome'
        />

        <LoginForm
        LOGIN_URL = '/advisor/login'
        loginHeader = 'Lead Advisor Login'
        redirectURL = '/LeadAdvisorHome'
        />

        <LoginForm
        LOGIN_URL = '/advisor/login'
        loginHeader = 'Advisor Login'
        redirectURL = '/advisorHome'
        />
        
        </>
    );
}
