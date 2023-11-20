import NonLoginNavBar from "./components/NavBar/NonLoginNavBar";
import HomePage from "./pages/NonLogin/HomePage/HomePage";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <div>
            <NonLoginNavBar />
            <HomePage />
            <Footer />
        </div>
    );
};

export default App;
