import {
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";
import { projectThemes } from "../../utils/consts";

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
                    data-cy="project-theme-input"
                >
                    {projectThemes.map((theme) => {
                        return (
                            <MenuItem
                                value={theme}
                                key={theme}
                                data-cy={`select-option-${theme}`}
                            >
                                {theme}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
}
