import { Card, Divider, Grid, Typography } from "@mui/material";
import NavigateBackIcon from "../../components/NavigationButtons/NavigateBackIcon";
import NavigateHomeButton from "../../components/NavigationButtons/NavigateHomeButton";

const UnknownUrl = () => {
    return (
        <>
            <NavigateBackIcon />
            <Grid container spacing={1} className="unknownUrl">
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Card elevation={6} className="errorCard">
                        <Typography variant="h3">
                            Destination unknown...
                        </Typography>
                        <Divider style={{ margin: "20px 0 30px 0" }} />
                        <Typography variant="body1">
                            Could not find this address.
                        </Typography>
                        <Typography variant="body1">
                            Please navigate to a valid address
                        </Typography>
                        <NavigateHomeButton />
                    </Card>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </>
    );
};

export default UnknownUrl;
