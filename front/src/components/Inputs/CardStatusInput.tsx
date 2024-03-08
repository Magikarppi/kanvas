import {
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";
import { statusThemes } from "../../utils/consts";

interface IProps {
    handleChange:
        | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
        | undefined;
    status: string;
}

export default function CardStatusInput({ handleChange, status }: IProps) {
    return (
        <>
            <Select
                id="status-select"
                value={status || "Select.."}
                onChange={handleChange}
                name="status"
                fullWidth
            >
                {statusThemes.map((status) => {
                    return (
                        <MenuItem
                            value={status}
                            key={status}
                            disabled={status === "Select.."}
                        >
                            {status}
                        </MenuItem>
                    );
                })}
            </Select>
        </>
    );
}