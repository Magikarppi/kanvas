import { useState } from "react";
import {
    ClickAwayListener,
    IconButton,
    InputAdornment,
    TextField,
    Grid,
} from "@mui/material";

import Icons from "../../Icons/Icons";

const LoginNavBarSearch = () => {
    const [activeSearch, setActiveSearch] = useState<boolean>(false);

    const handleCancelSearch = () => {
        setActiveSearch(false);
    };
    const handleClickAway = () => {
        setActiveSearch(false);
    };

    return (
        <>
            {!activeSearch ? (
                <IconButton
                    onClick={() => setActiveSearch(true)}
                    style={{ float: "right" }}
                >
                    <Icons.Search />
                </IconButton>
            ) : (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            placeholder="Search..."
                            autoFocus
                            sx={{
                                backgroundColor: "#0E0E0E",
                                zIndex: 9999999,
                                padding: "10px 10px 10px 30px",
                            }}
                            onKeyUp={(event) => {
                                if (event.key === "Escape") {
                                    handleCancelSearch();
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="start"
                                        onClick={handleCancelSearch}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Icons.Close />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                        />
                    </Grid>
                </ClickAwayListener>
            )}
        </>
    );
};

export default LoginNavBarSearch;
