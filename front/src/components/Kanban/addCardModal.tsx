import {
    Button,
    Card,
    Container,
    InputLabel,
    Modal,
    TextField,
    Box,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useState } from "react";
import {
    IAddCardModal,
    IOnSaveAddCardModalObject,
} from "../../models/cardModels";
import DatePicker from "../DatePicker/Datepicker";
import { ProjectMember } from "../../models/projectModels";

export const AddCardModal = (props: IAddCardModal) => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [selectOption, setSelectOption] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());

    const options = props.members
        ? props.members.map((value: ProjectMember) => ({
            value: value.id,
            label: `${value.firstName}, ${value.lastName}`,
        }))
        : [];

    const statuses = [
        { value: "", label: "None" },
        { value: "In Progress", label: "In Progress" },
        { value: "To do", label: "To do" },
        { value: "Done", label: "Done" },
    ];

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 50) {
            setTitle(e.target.value);
        }
    };

    const onAddCard = () => {
        const object: IOnSaveAddCardModalObject = {
            title: title,
            desc: desc,
            status: status,
            files: [],
            dueDate: dueDate,
            responsiblePersonId: selectOption,
        };
        props.onSaveAddCardModal(object);
        setTitle("");
        setDesc("");
        setSelectOption("");
        setStatus("");
        setDueDate(new Date());
    };

    const datePickerOnChange = (date: Date) => {
        setDueDate(date);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "95%",
        border: "2px solid #5e00ff",
        boxShadow: 24,
        p: 1,
        overflowY: "auto",
        maxWidth: "900px",
        maxHeight: "800px",
        minWidth: "500px",
        minheight: "200px",
        cursor: "default",
    };

    const inputLabelStyle={marginBottom: "2px"};
    return (
        <Modal
            open={props.isAddCardModalOpen}
            onClose={() => props.onCloseAddCardModal()}
            hideBackdrop={true}
            data-cy="add-card-modal"
        >
            <Card sx={style}>
                <Container
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        justifyContent: "space-around",
                    }}
                >
                    <Box
                        sx={{
                            fontSize: "2em",
                            height: "5%",
                            alignItems: "center",
                            display: "flex",
                            color: "white",
                            marginTop: "10px",
                        }}
                    >
                        Add new card
                    </Box>
                    <Box
                        sx={{
                            height: "20%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <InputLabel sx={{}}>Card title</InputLabel>
                        </Box>

                        <TextField
                            value={title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => onTitleChange(e)}
                            placeholder="Card title *"
                            sx={{ width: "100%" }}
                            data-cy="add-card-modal-title-input"
                        />
                        <Box sx={{ marginLeft: "12px", marginTop: "4px" }}>
                            {title.length}/50
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <InputLabel sx={inputLabelStyle}>
                            Description
                        </InputLabel>
                        <TextField
                            value={desc}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setDesc(e.target.value)}
                            size="medium"
                            multiline={true}
                            placeholder="Description"
                            sx={{
                                width: "100%",
                                margin: 0,
                                padding: 0,
                            }}
                            InputProps={{style: { fontSize: 14 },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "15%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{ width: "50%", height: "100%" }}>
                            <InputLabel sx={inputLabelStyle}>Status</InputLabel>
                            <Box>
                                <Box>
                                    <Select
                                        value={status}
                                        onChange={(e: SelectChangeEvent) =>
                                            setStatus(e.target.value)
                                        }
                                        sx={{
                                            width: "50%",
                                        }}
                                        displayEmpty
                                    >
                                        {statuses.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: "50%", height: "100%" }}>
                            <InputLabel sx={inputLabelStyle}>
                                Due date
                            </InputLabel>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Box sx={{ width: "100%" }}>
                                    <DatePicker
                                        selected={dueDate}
                                        onChange={datePickerOnChange}
                                        customInput={
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <CalendarMonthIcon
                                                    sx={{
                                                        alignSelf: "flex-end",
                                                        marginTop: "7%",
                                                        marginRight: "5%",
                                                        position: "absolute",
                                                    }}
                                                    fontSize="large"
                                                />
                                                <TextField
                                                    sx={{
                                                        width: "100%",
                                                        marginBottom: "5%",
                                                    }}
                                                    inputProps={{
                                                        readOnly: true,
                                                    }}
                                                    name="endDate"
                                                    value={dueDate.toLocaleDateString(
                                                        "fi-FI"
                                                    )}
                                                    fullWidth
                                                />
                                            </Box>
                                        }
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: "20%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}
                    >
                        <InputLabel sx={inputLabelStyle}>
                        Responsible Persons
                        </InputLabel>
                        <Select
                            value={selectOption}
                            onChange={(e: SelectChangeEvent) =>
                                setSelectOption(e.target.value)
                            }
                            defaultValue={options[0].label}
                            sx={{ width: "100%" }}
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box
                        sx={{
                            height: "20%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "3%",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={title.length === 0 ? true : false}
                            onClick={() => onAddCard()}
                            data-cy="add-card-modal-submit-button"
                        >
                            Add card
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => props.onCloseAddCardModal()}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Container>
            </Card>
        </Modal>
    );
};
