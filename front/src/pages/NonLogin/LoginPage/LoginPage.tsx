import LoginForm from "./LoginForm";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";
import { Grid, Paper } from "@mui/material";

const LoginPage = () => {
    return (
        <div className="pageContainer">
            <NavigateBackIcon />
            <Grid container>
                <Grid item md={2} />
                <Grid item md={8}>
                    <Paper elevation={1} className="elevatedSection">
                        <LoginForm />
                    </Paper>
                </Grid>
                <Grid item md={2} />
            </Grid>
        </div>
    );
};

export default LoginPage;
