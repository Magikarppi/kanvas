import {TextField} from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    description: string;
}

export default function CardDescriptionInput({
    handleChange,
    description,
}: IProps) {
    return (
        <>
            <TextField
                fullWidth
                value={description}
                onChange={handleChange}
                type="text"
                id="description"
                name="description"
                autoComplete="off"
                multiline
                rows={6}
                InputProps={{
                    style: { fontSize: 14 },
                }}
            />
        </>
    );
}