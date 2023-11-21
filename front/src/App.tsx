import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/NonLogin/HomePage/HomePage";
import LoginPage from "./pages/NonLogin/LoginPage/LoginPage";
import RegistrationPage from "./pages/NonLogin/RegistrationPage/RegistrationPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import UnknownUrl from "./pages/ErrorPage/UnknownUrl";
import NonLoginNavBar from "./components/NavBar/NonLoginNavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <div>
            <NonLoginNavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<RegistrationPage />} />

                <Route path="/profile" element={<UserProfilePage />} />

                <Route path="*" element={<UnknownUrl />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
