import React, { SyntheticEvent } from "react";
import {
    Autocomplete,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";

import Icons from "../../Icons/Icons";

const dummyCardOptions = [
    { title: "Refactor spaghetti code into linguini code" },
    { title: "Hunt down the elusive memory leak" },
    { title: "Tame the wild callback jungle" },
    { title: "Battle CSS specificity wars" },
    { title: "Herding asynchronous cats" },
    { title: "Chase after the floating point precision" },
    { title: "Debugging with a blindfold on" },
    { title: "Conquer the endless meeting loop" },
    { title: "Unravel the mystery of NaN" },
    { title: "Survive the event-driven apocalypse" },
];

type DisplayType = "grid" | "list";
type Props = {
    toggleListOrGrid: (
        _: React.MouseEvent<HTMLElement>,
        display: string
    ) => void;
    showGridOrList: DisplayType;
    width: number;
};

const ProjectToolbar = ({ toggleListOrGrid, showGridOrList, width }: Props) => {
    const handleDisplay = (
        _: React.MouseEvent<HTMLElement>,
        display: string
    ) => {
        toggleListOrGrid(_, display);
    };

    const handleSelectCard = (_: SyntheticEvent, value: string | null) => {
        if (value && value.trim() !== "") {
            // ToDo: Open card modal when card is selected
            console.log(value);
        }
    };

    return (
        <Grid container py={2} alignItems="center" width={`${width}px`}>
            <Grid item xs={12} sm={6}>
                <ToggleButtonGroup
                    value={showGridOrList}
                    onChange={handleDisplay}
                    exclusive
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "center",
                            sm: "flex-start",
                        },
                        marginLeft: {
                            xs: 0,
                            sm: "10%",
                        },
                    }}
                >
                    <ToggleButton value="grid" aria-label="grid-view">
                        <Tooltip
                            title={<Typography>Show Grid</Typography>}
                            arrow
                            enterDelay={350}
                        >
                            <Icons.Grid size="29.4px" />
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton value="list" aria-label="list-view">
                        <Tooltip
                            title={<Typography>Show List</Typography>}
                            arrow
                            enterDelay={350}
                        >
                            <Icons.List size="29.4px" />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignItems="center"
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        sm: "flex-end",
                    },
                    mt: {
                        xs: 2,
                        sm: 0,
                    },
                }}
            >
                <Autocomplete
                    clearOnEscape
                    blurOnSelect
                    onChange={handleSelectCard}
                    isOptionEqualToValue={(option, value) => option === value}
                    sx={{
                        marginRight: {
                            sm: 4,
                            xs: 0,
                        },
                    }}
                    ListboxProps={{
                        sx: {
                            fontSize: "14px",
                        },
                    }}
                    options={dummyCardOptions.map((card) => card.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for a Card"
                            sx={{
                                width: "325px",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "23px",
                                },
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default ProjectToolbar;
