import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/NonLogin/HomePage/HomePage";
import LoginPage from "./pages/NonLogin/LoginPage/LoginPage";
import RegistrationPage from "./pages/NonLogin/RegistrationPage/RegistrationPageh";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import UnknownUrl from "./pages/ErrorPage/UnknownUrl";
import NonLoginNavBar from "./components/NavBar/NonLoginNavBar";
import LoginNavBar from "./components/NavBar/LoginNavBar/LoginNavBar";
import Footer from "./components/Footer/Footer";

import MainContainer from "./components/MainContainer/MainContainer";
import ForgotPasswordPage from "./pages/NonLogin/ForgotPasswordPage/ForgotPasswordPage";
import AllProjectsPage from "./pages/Project/AllProjectsPage";

const App = () => {
    const user = true;

    const [open, setOpen] = useState(false);

    return (
        <div>
            {user ? (
                <LoginNavBar open={open} setOpen={setOpen} />
            ) : (
                <NonLoginNavBar />
            )}
            <MainContainer open={open}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<RegistrationPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                    <Route path="/projects" element={<AllProjectsPage />} />
                    <Route path="/projects/:id" element={<ProjectPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/teams" element={<UnknownUrl />} />
                    <Route path="/messages" element={<UnknownUrl />} />
                    <Route path="/notifications" element={<UnknownUrl />} />
                    <Route path="*" element={<UnknownUrl />} />
                </Routes>
                {!user && <Footer />}
            </MainContainer>
        </div>
    );
};

export default App;
