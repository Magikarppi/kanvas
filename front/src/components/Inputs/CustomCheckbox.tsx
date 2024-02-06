import { Box, Checkbox, InputLabel } from "@mui/material";

interface IProps {
    handleChange:
        | ((event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void)
        | undefined;
    name: string;
    value: boolean;
    label?: string;
}

export default function CustomCheckbox({
    handleChange,
    value,
    name,
    label,
}: IProps) {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                    id={name}
                    name={name}
                    checked={value}
                    onChange={handleChange}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                />
                <InputLabel sx={{ color: "white", marginTop: "4px" }}>
                    {label}
                </InputLabel>
            </Box>
        </>
    );
}
