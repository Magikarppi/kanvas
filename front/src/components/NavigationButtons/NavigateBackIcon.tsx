import { useNavigate } from "react-router-dom";
import { Container, IconButton } from "@mui/material";

import Icons from "../Icons/Icons";

const NavigateBackIcon = () => {
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <Container style={{ position: "absolute", marginTop: "25px" }}>
            <IconButton size="small" onClick={handleNavigateBack}>
                <Icons.ArrowBack />
            </IconButton>
        </Container>
    );
};

export default NavigateBackIcon;
