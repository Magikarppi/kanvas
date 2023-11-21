import LoginForm from "./LoginForm";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";

const LoginPage = () => {
    return (
        <>
            <NavigateBackIcon />
            <div className="loginPage">
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
