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
}

export default function DeleteConfirmation({ name, onDelete }: IProps) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        if (inputValue.trim().toLowerCase() === name.trim().toLowerCase()) {
            onDelete();
            setOpen(false);
        } else {
            toast.error(
                "Name you provided does not match the name of the entity you want to delete"
            );
        }
    };

    return (
        <>
            <Button variant="text" color="error" onClick={() => setOpen(true)}>
                Delete project
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting a cannot be undone. If you still want to delete
                        this project, write{" "}
                        <Typography component="span">{name}</Typography> into
                        the input and click "Delete". Otherwise click "Cancel".
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
                <DialogActions
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        color="secondary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
