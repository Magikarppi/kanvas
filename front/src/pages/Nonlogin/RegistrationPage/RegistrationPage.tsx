import RegistrationForm from "./RegistrationForm";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";

const RegistrationPage = () => {
    return (
        <>
            <NavigateBackIcon />
            <div className="registrationPage">
                <RegistrationForm />
            </div>
        </>
    );
};

export default RegistrationPage;
