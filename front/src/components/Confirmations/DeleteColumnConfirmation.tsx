import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    name: string;
    onDelete: () => void;
    open: boolean;
    close: () => void;
}

export default function DeleteConfirmation({
    name,
    open,
    close,
    onDelete,
}: IProps) {
    const [inputValue, setInputValue] = useState("");

    const handleDelete = () => {
        if (inputValue.trim().toLowerCase() === name.trim().toLowerCase()) {
            onDelete();
            setInputValue("");
            close();
        } else {
            toast.error(
                "Name you provided does not match the name of the entity you want to delete"
            );
        }
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deleting a column cannot be undone. All cards in this column
                    will also be deleted. If you still want to delete this
                    column, write{" "}
                    <Typography component="span">{name}</Typography> into the
                    input and click "Delete". Otherwise click "Cancel".
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id={name}
                    type="text"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    onClick={handleDelete}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
                <Button onClick={close} color="secondary" variant="contained">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
