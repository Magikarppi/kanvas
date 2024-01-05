import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DefaultToastContainer = () => {
    return (
        <ToastContainer
            autoClose={5500}
            pauseOnFocusLoss={false}
            position="bottom-left"
            transition={Zoom}
            theme="dark"
            style={{
                fontSize: 14,
            }}
        />
    );
};

export default DefaultToastContainer;