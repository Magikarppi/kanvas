import {TextField, InputAdornment } from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    status: string;
}

export default function CardStatusInput({
    handleChange,
    status,
}: IProps) {
    return (
        <>
            <TextField
                onChange={handleChange}
                value={status}
                name="status"
                type="text"
                id="status"
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <DnsIcon fontSize="large"/>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
}