import { useState } from "react";
import {
    ClickAwayListener,
    IconButton,
    InputAdornment,
    TextField,
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
                    <div>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            placeholder="Search..."
                            autoFocus
                            sx={{
                                border: 0,
                                width: "100vw",
                                top: 0,
                                left: 0,
                                backgroundColor: "#0E0E0E",
                                position: "absolute",
                                minHeight: "48px",
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
                                    >
                                        <Icons.Close />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                        />
                    </div>
                </ClickAwayListener>
            )}
        </>
    );
};

export default LoginNavBarSearch;
