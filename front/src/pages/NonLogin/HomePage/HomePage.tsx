import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { selectToken } from "../../../redux/hooks";
import { useEffect } from "react";

const HomePage = () => {
    const token = selectToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    return token ? null : (
        <div>
            <Grid
                container
                spacing={1}
                className="homeContainer1"
                sx={{ marginTop: "-20px" }}
            >
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <div className="homePageCard1">
                        <Typography variant="h3" className="homeTitle">
                            Kanvas
                        </Typography>
                        <Typography variant="h4" className="homeSubtitle">
                            The Ultimate Project Management Tool
                        </Typography>
                        <Typography variant="h6" className="homeBodyText">
                            Sign up for your account today
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/sign-up")}
                        >
                            Sign up
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <Grid container spacing={1} className="homeContainer2">
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <div className="homePageCard2">
                        <Typography variant="h4" className="homeSubtitle">
                            Seamless User Experience
                        </Typography>
                        <Typography variant="h6" className="homeBodyText">
                            Sign in to your account to get started
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/sign-in")}
                        >
                            Sign in
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </div>
    );
};

export default HomePage;
