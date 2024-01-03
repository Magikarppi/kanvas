import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Icons from "../Icons/Icons";

const NavigateHomeButton = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate("/");
    };

    return (
        <Button
            onClick={handleNavigateHome}
            color="secondary"
            variant="contained"
            startIcon={<Icons.Home size="16" />}
            style={{ marginTop: "30px" }}
            data-testid="navigationHomeButton"
        >
            Go home
        </Button>
    );
};

export default NavigateHomeButton;
