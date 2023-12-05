import { useState, Dispatch, SetStateAction } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import Icons from "../../Icons/Icons";

interface ISearchBar {
    setActiveSearch: Dispatch<SetStateAction<boolean>>;
}

const ProjectSearchBar = ({ setActiveSearch }: ISearchBar) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <TextField
                variant="outlined"
                size="small"
                onChange={({ target }) => setSearchQuery(target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icons.Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setActiveSearch(false)}>
                                <Icons.Close />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};

export default ProjectSearchBar;
