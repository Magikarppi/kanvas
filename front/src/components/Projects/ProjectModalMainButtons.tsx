import { Box, Button } from "@mui/material";

interface IProps {
    submitButtonLabel: string;
    disableSubmitButton: boolean;
    close: () => void;
}

export default function ProjectModalMainButtons({
    submitButtonLabel,
    disableSubmitButton,
    close,
}: IProps) {
    return (
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
                disabled={disableSubmitButton}
                color="secondary"
                type="submit"
                data-cy="project-submit-button"
            >
                {submitButtonLabel}
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={close}
                data-cy="project-close-button"
            >
                Cancel
            </Button>
        </Box>
    );
}
