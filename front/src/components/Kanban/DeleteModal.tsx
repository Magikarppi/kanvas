import { Button, Modal, Typography, Box } from "@mui/material";
import { ICard } from "../../models/cardModels";

interface IPropsDeleteModal {
    open: boolean;
    card: ICard;
    close: () => void;
    deleteCard: () => void;
}

const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export const DeleteModal = ({
    open,
    close,
    card,
    deleteCard,
}: IPropsDeleteModal) => {
    return (
        <>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                hideBackdrop={true}
                data-cy="card-delete-modal"
            >
                <Box sx={deleteModalStyle}>
                    <Typography
                        style={{ textAlign: "center", fontSize: "23px" }}
                    >
                        Are you sure you want to remove this card?
                    </Typography>
                    <Typography
                        style={{ textAlign: "center", fontSize: "20px" }}
                    >
                        {card.title}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "40px",
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginRight: "10px" }}
                            onClick={deleteCard}
                            data-cy="card-delete-modal-delete-button"
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "grey", color: "white" }}
                            onClick={close}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default DeleteModal;
