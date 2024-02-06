/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

interface IProps {
    handleChange:
        | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
        | undefined;
    theme: string;
}

export default function ProjectThemeInput({ handleChange, theme }: IProps) {
    return (
        <>
            <InputLabel htmlFor="theme">Theme</InputLabel>
            <FormControl fullWidth>
                <Select
                    labelId="theme-select-label"
                    id="theme-select"
                    value={theme}
                    onChange={handleChange}
                    name="theme"
                >
                    <MenuItem value="blank">Blank</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
