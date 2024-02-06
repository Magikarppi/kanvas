import { FormControlLabel, Checkbox, InputLabel } from "@mui/material";

interface IProps {
    isOpenToWork: boolean;
    handleChange:
        | ((event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void)
        | undefined;
}

export default function IsOpenToWorkInput({
    isOpenToWork,
    handleChange,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="isOpenToWork">Open for work</InputLabel>
            <FormControlLabel
                control={
                    <Checkbox
                        id="isOpenToWork"
                        name="isOpenToWork"
                        checked={isOpenToWork}
                        onChange={handleChange}
                        sx={{
                            "& .MuiSvgIcon-root": { fontSize: 22 },
                        }}
                    />
                }
                label="I am open for finding work"
                labelPlacement="end"
            />
        </>
    );
}
