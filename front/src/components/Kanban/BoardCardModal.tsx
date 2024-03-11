import {
    Button,
    Card,
    InputLabel,
    Modal,
    TextField,
    Typography,
    Box,
    Grid,
    Select,
    MenuItem,
    ListItem,
    IconButton,
    ListItemText,
    Divider,
    InputAdornment,
    Container,
    Collapse,
    SelectChangeEvent,
    Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import {
    ICard,
    ICardResponsiblePerson,
    IResponsiblePerson,
} from "../../models/cardModels";
import cardsService from "../../services/cardsService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { selectToken } from "../../redux/hooks";
import { useFormik } from "formik";
import { updateCardSchema } from "../../schemas";
import CardTitleInput from "../Inputs/CardTitleInput";
import CardStatusInput from "../Inputs/CardStatusInput";
import CardDueDateInput from "../Inputs/CardDueDateInput";
import CardDescriptionInput from "../Inputs/CardDescriptionInput";
import DeleteModal from "./DeleteModal";
import { ProjectMember } from "../../models/projectModels";
import Icons from "../Icons/Icons";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 as uuid } from "uuid";

const comments = [
    {
        id: 1,
        comment: "Haloo",
    },
    {
        id: 2,
        comment: "Haloo2",
    },
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "84%",
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
    maxWidth: "900px",
    maxHeight: "660px",
    minWidth: "200px",
    cursor: "default",
};

const uploadBoxStyle = {
    width: "auto",
    margin: "30px",
    height: "auto",
    minHeight: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column nowrap",
    fontSize: "24px",
    color: "#555555",
    border: "2px #c3c3c3 dashed",
    borderRadius: "12px",
};

interface IPropsCardModal {
    open: boolean;
    card: ICard;
    close: () => void;
    setCard: React.Dispatch<React.SetStateAction<ICard>>;
    projectMembers: ProjectMember[];
    cardResponsiblePersons: ICardResponsiblePerson[];
    setCardResponsiblePersons: React.Dispatch<
        React.SetStateAction<ICardResponsiblePerson[]>
    >;
    updateCards: (card: ICard) => void;
    allCards: ICard[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export const BoardCardModal = ({
    open,
    close,
    card,
    setCard,
    projectMembers,
    cardResponsiblePersons,
    setCardResponsiblePersons,
    updateCards,
    allCards,
    setCards,
}: IPropsCardModal) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [selectedUsersState, setSelectedUsersState] = useState<
        ProjectMember[]
    >([]);
    const [alreadyResponsibles, setAlreadyResponsibles] = useState<
        ICardResponsiblePerson[]
    >(cardResponsiblePersons);
    const [deletedPersons, setDeletedPersons] = useState<
        ICardResponsiblePerson[]
    >([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("Select..");
    const token = selectToken();

    const {
        setValues,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: {
            title: card!.title,
            subTitle: card!.subTitle || "",
            description: card!.description || "",
            status: card!.status || "",
            dueDate: card!.dueDate || new Date(),
        },
        validationSchema: updateCardSchema,
        async onSubmit(values) {
            try {
                if (token) {
                    const updateCard: ICard = {
                        ...card,
                        title: values!.title,
                        subTitle: values!.subTitle || null,
                        description: values!.description || null,
                        status:
                            values.status === "None"
                                ? null
                                : values!.status || null,
                        dueDate: values!.dueDate || null,
                    };
                    await cardsService.updateCard(token, updateCard);
                    if (selectedUsersState.length > 0) {
                        for (let i = 0; i < selectedUsersState.length; i++) {
                            const findResponsibleId = alreadyResponsibles.find(
                                (val) => val.userId === selectedUsersState[i].id
                            );
                            const data: IResponsiblePerson = {
                                id: findResponsibleId!.cardResponsibleId,
                                userId: selectedUsersState[i].id,
                                cardId: card.id,
                            };
                            await cardsService.addResponsiblePerson(
                                token,
                                data
                            );
                        }
                    }
                    if (deletedPersons.length > 0) {
                        for (let i = 0; i < deletedPersons.length; i++) {
                            await cardsService.deleteResponsiblePerson(
                                token,
                                deletedPersons[i].cardResponsibleId
                            );
                        }
                    }
                    updateCards(updateCard);
                    setCardResponsiblePersons(alreadyResponsibles);
                    setCard(updateCard);
                    setSelectedUsersState([]);
                    setDeletedPersons([]);
                    close();
                    toast.success("Card successfully updated");
                } else {
                    close();
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error);
                    toast.error(error?.response?.data);
                }
            }
        },
    });

    useEffect(() => {
        if (card) {
            setValues({
                ...card,
                title: card.title,
                subTitle: card.subTitle || "",
                description: card.description || "",
                status: card.status || "",
                dueDate: (card!.dueDate as Date) || null,
            });
        }
    }, [card]);

    useEffect(() => {
        setAlreadyResponsibles(cardResponsiblePersons);
    }, [cardResponsiblePersons]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const closeBoardCardModal = () => {
        setCard({
            ...card,
            title: card.title,
            subTitle: card.subTitle || "",
            description: card.description || "",
            status: card.status || "",
            dueDate: card!.dueDate || null,
        });
        close();
    };

    const openDeleteModal = () => setDeleteModal(true);
    const closeDeleteModal = () => setDeleteModal(false);

    const deleteCard = async () => {
        try {
            if (token) {
                await cardsService.deleteCard(token, card.id);
            }
            const newCards = allCards.filter((c) => c.id !== card.id);
            setCards(newCards);
            closeDeleteModal();
            close();
            toast.success("Card deleted");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        }
    };

    const addResponsiblePerson = () => {
        const selectedUserValues = projectMembers.find(
            (val) => val.id === selectedUserId
        );
        const foundError = alreadyResponsibles.find(
            (val) => val.userId === selectedUserId
        );
        if (foundError) {
            toast.error("The user is already responsible for this card");
            setSelectedUserId("Select..");
            return;
        }

        const copySelectedUsersState: ProjectMember[] = [...selectedUsersState];
        const newMember: ProjectMember = {
            id: selectedUserValues!.id,
            firstName: selectedUserValues!.firstName,
            lastName: selectedUserValues!.lastName,
            email: selectedUserValues!.email,
            picture: selectedUserValues!.picture,
        };
        const copyResponsiblesStateArray: ICardResponsiblePerson[] = [
            ...alreadyResponsibles,
        ];
        const responsibleUser: ICardResponsiblePerson = {
            cardResponsibleId: uuid(),
            userId: selectedUserValues!.id,
            firstName: selectedUserValues!.firstName,
            lastName: selectedUserValues!.lastName,
            email: selectedUserValues!.email,
            picture: selectedUserValues!.picture,
        };

        copyResponsiblesStateArray.push(responsibleUser);
        setAlreadyResponsibles(copyResponsiblesStateArray);
        copySelectedUsersState.push(newMember);
        setSelectedUsersState(copySelectedUsersState);
        setSelectedUserId("Select..");
    };

    const onDeleteResponsiblePersonData = (userId: string) => {
        const findResponsible = alreadyResponsibles.find(
            (val) => val.userId === userId
        );
        const findSelected = selectedUsersState.find(
            (val) => val.id === userId
        );
        const findDelete = deletedPersons.find((val) => val.userId === userId);
        if (findSelected || findDelete) {
            const newSelectedUsers = selectedUsersState.filter(
                (val) => val.id !== userId
            );
            setSelectedUsersState(newSelectedUsers);
            const newDeletedPersons = deletedPersons.filter(
                (val) => val.userId !== userId
            );
            setDeletedPersons(newDeletedPersons);
            const newResponsibles = alreadyResponsibles.filter(
                (val) => val.userId !== userId
            );
            setAlreadyResponsibles(newResponsibles);
        } else {
            setDeletedPersons([...deletedPersons, findResponsible!]);
            const newResponsibles = alreadyResponsibles.filter(
                (val) => val.userId !== userId
            );
            setAlreadyResponsibles(newResponsibles);
        }
    };

    const selectChange = (event: SelectChangeEvent<typeof selectedUserId>) => {
        const {
            target: { value },
        } = event;
        setSelectedUserId(value);
    };

    const disable = !values.title;
    const disableAdd =
        selectedUserId === undefined || selectedUserId === "Select..";

    return (
        <>
            <Modal
                open={open}
                onClose={close}
                hideBackdrop={true}
                data-cy="edit-card-modal"
            >
                <Card sx={style}>
                    <Container
                        component="form"
                        onSubmit={handleSubmit}
                        style={{ cursor: "default", width: "90%" }}
                    >
                        <Grid
                            container
                            direction="row"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Typography
                                style={{
                                    marginBottom: "30px",
                                    marginTop: "25px",
                                    fontSize: "2.5rem",
                                    fontWeight: "bold",
                                    flexGrow: 1,
                                }}
                            >
                                Edit card
                            </Typography>
                            <Typography
                                onClick={openDeleteModal}
                                data-cy="edit-card-delete-card-button"
                                style={{
                                    marginBottom: "25px",
                                    color: "red",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Delete card
                            </Typography>
                        </Grid>
                        <Grid item xs={10} md={12} lg={12} xl={10}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Title
                            </InputLabel>
                            <CardTitleInput
                                title={values.title}
                                touched={touched.title}
                                error={errors.title}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            md={12}
                            lg={12}
                            xl={10}
                            sx={{ marginLeft: "10px" }}
                        >
                            <h4>{values?.title?.length} / 100</h4>
                        </Grid>
                        <Grid item xs={10} md={12} lg={12} xl={10}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Description
                            </InputLabel>
                            <CardDescriptionInput
                                description={values.description}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            md={12}
                            lg={12}
                            xl={10}
                            sx={{ marginLeft: "10px" }}
                        >
                            <h4>{values?.description?.length} / 500</h4>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={10}
                        >
                            <Grid item xs={12} md={4} lg={6} xl={6}>
                                <InputLabel sx={{ fontSize: "1.7rem" }}>
                                    Status
                                </InputLabel>
                                <CardStatusInput
                                    status={values.status}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={6} xl={6}>
                                <InputLabel sx={{ fontSize: "1.7rem" }}>
                                    Due date
                                </InputLabel>
                                <CardDueDateInput
                                    dueDate={values.dueDate}
                                    setFieldValue={setFieldValue}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={10} md={12} lg={12} xl={10}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Responsible Persons
                            </InputLabel>
                            <Select
                                id="demo-multiple-name"
                                value={selectedUserId}
                                fullWidth
                                onChange={selectChange}
                            >
                                <MenuItem value="Select..">Select..</MenuItem>
                                {projectMembers.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box
                                sx={{
                                    display: "flex",
                                    marginTop: "10px",
                                    marginLeft: "4px",
                                }}
                            >
                                <Chip
                                    icon={<Icons.AddPerson size="14px" />}
                                    onClick={addResponsiblePerson}
                                    label="Add person"
                                    color="success"
                                    size="small"
                                    variant="outlined"
                                    disabled={disableAdd}
                                    sx={{
                                        fontSize: "12px",
                                        alignSelf: {
                                            xs: "center",
                                            sm: "flex-end",
                                        },
                                        padding: "2px",
                                        marginTop: {
                                            xs: "20px",
                                            sm: 0,
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                        {alreadyResponsibles.map((val) => (
                            <Box
                                key={val.userId}
                                sx={{
                                    width: "100%",
                                    maxWidth: 400,
                                    marginTop: "10px",
                                }}
                            >
                                <ListItem
                                    onClick={() =>
                                        onDeleteResponsiblePersonData(
                                            val.userId
                                        )
                                    }
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteForeverIcon
                                                sx={{
                                                    fontSize: "x-large",
                                                    color: "red",
                                                }}
                                            />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            val.firstName + " " + val.lastName
                                        }
                                        primaryTypographyProps={{
                                            fontSize: 16,
                                        }}
                                    />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                        <Grid item xs={10} md={12} lg={12} xl={10}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Upload files
                            </InputLabel>
                        </Grid>
                        <Grid item xs={10} md={12} lg={12} xl={10}>
                            <Box style={uploadBoxStyle}>
                                <InputLabel
                                    sx={{ color: "grey", fontSize: "1.7rem" }}
                                >
                                    Drag and Drop or click to upload
                                </InputLabel>
                                <CloudUploadIcon sx={{ fontSize: 55 }} />
                            </Box>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <InputLabel
                                sx={{ fontSize: "1.7rem", flexGrow: 1 }}
                            >
                                Comments
                            </InputLabel>
                            {!expanded ? (
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={handleExpandClick}
                                >
                                    <ExpandMoreIcon sx={{ fontSize: "22px" }} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={handleExpandClick}
                                >
                                    <ExpandLess sx={{ fontSize: "22px" }} />
                                </IconButton>
                            )}
                        </Grid>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Box
                                border={1}
                                borderColor="grey.500"
                                padding={3}
                                sx={{ marginTop: "10px" }}
                            >
                                {comments.map((val) => (
                                    <Grid
                                        item
                                        xs={10}
                                        md={12}
                                        lg={12}
                                        xl={10}
                                        key={val.id}
                                    >
                                        <ListItem
                                            key={val.id}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    X
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={val.comment}
                                                primaryTypographyProps={{
                                                    fontSize: 16,
                                                }}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Grid>
                                ))}
                                <Grid
                                    sx={{ marginTop: "15px" }}
                                    item
                                    xs={10}
                                    md={12}
                                    lg={12}
                                    xl={10}
                                >
                                    <TextField
                                        name="newEmailState"
                                        id="newEmailState"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{ p: "10px" }}
                                                        aria-label="directions"
                                                    >
                                                        <SendIcon fontSize="large" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    ></TextField>
                                </Grid>
                            </Box>
                        </Collapse>
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
                                color="secondary"
                                sx={{ marginRight: "10px" }}
                                type="submit"
                                disabled={disable}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={closeBoardCardModal}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Container>
                </Card>
            </Modal>
            <DeleteModal
                open={deleteModal}
                close={closeDeleteModal}
                card={card}
                deleteCard={deleteCard}
            />
        </>
    );
};

export default BoardCardModal;
