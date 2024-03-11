import React, { SyntheticEvent, useState } from "react";
import {
    Autocomplete,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import styled from "styled-components";


import Icons from "../../Icons/Icons";
import { ICard, ICardResponsiblePerson } from "../../../models/cardModels";
import { IProjectColumn, ProjectMember } from "../../../models/projectModels";
import { selectToken } from "../../../redux/hooks";
import BoardCardModal from "../../Kanban/BoardCardModal";
import cardsService from "../../../services/cardsService";

type DisplayType = "grid" | "list";

type Props = {
    toggleListOrGrid: (
        _: React.MouseEvent<HTMLElement>,
        display: string
    ) => void;
    showGridOrList: DisplayType;
    cards: ICard[];
    columns: IProjectColumn[];
    updateCards: (card: ICard) => void;
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
    projectMembers: ProjectMember[];
};

const GroupHeader = styled.div`
    position: sticky;
    top: -8px;
    padding: 4px 10px;
    margin-right: 10px;
    color: white;
    font-weight: bold;
    font-size: 15.5px;
    background-color: #424242;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis,
`;

const GroupItems = styled.ul`
    font-size: 13.5px;
    padding: 0;
    margin-right: 10px;
    & > *:hover {
        background-color:#5F01FB !important;
        font-weight: bold;
        transition: all 0.2s;
        border-radius: 4px;
    }
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProjectToolbar = ({
    toggleListOrGrid,
    showGridOrList,
    cards,
    columns,
    updateCards,
    setCards,
    projectMembers,
}: Props) => {
    const [cardModal, setCardModal] = useState<boolean>(false);
    const [responsiblePersons, setResponsiblePersons] = useState<
        ICardResponsiblePerson[]
    >([]);
    const [oneCard, setOneCard] = useState<ICard>({} as ICard);
    const token = selectToken();

    const openCardModal = () => setCardModal(true);
    const closeCardModal = () => {
        setCardModal(false);
    };

    const handleDisplay = (
        _: React.MouseEvent<HTMLElement>,
        display: string
    ) => {
        toggleListOrGrid(_, display);
    };

    const handleSelectCard = async (
        _: SyntheticEvent,
        value: ICard | undefined
    ) => {
        if (value) {
            const card: ICard = {
                id: value.id,
                projectId: value.projectId,
                title: value.title,
                subTitle: value.subTitle,
                description: value.description,
                status: value.status,
                creationDate: value.creationDate,
                dueDate: value.dueDate,
                attachments: value.attachments,
                inColumn: value.inColumn,
                orderIndex: value.orderIndex,
            };
            setOneCard({ ...card });
            const responsiblePersons = await cardsService.getResponsiblePerson(
                token as string,
                card.id
            );
            setResponsiblePersons([...responsiblePersons]);
            openCardModal();
        }
    };

    const enchancedCards = cards.map((card) => {
        const column = columns.find((col) => col.id === card.inColumn);
        const columnName = column!.columnName;
        const orderIndex = column!.orderIndex;
        return {
            columnName: columnName,
            columnOrderIndex: orderIndex,
            ...card,
        };
    });

    return (
        <Grid container py={2} alignItems="center" position="sticky">
            <Grid item xs={12} sm={6}>
                <ToggleButtonGroup
                    value={showGridOrList}
                    onChange={handleDisplay}
                    exclusive
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "center",
                            sm: "flex-start",
                        },
                        marginLeft: {
                            xs: 0,
                            sm: "10%",
                        },
                    }}
                >
                    <ToggleButton data-cy="show-grid-button" value="grid" aria-label="grid-view">
                        <Tooltip
                            title={<Typography>Show Grid</Typography>}
                            arrow
                            enterDelay={350}
                        >
                            <Icons.Grid size="29.4px" />
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton value="list" aria-label="list-view">
                        <Tooltip
                            title={<Typography>Show List</Typography>}
                            arrow
                            enterDelay={350}
                        >
                            <Icons.List size="29.4px" />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignItems="center"
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        sm: "flex-end",
                    },
                    mt: {
                        xs: 2,
                        sm: 0,
                    },
                }}
            >
                <Autocomplete
                    key={Math.random()}
                    clearOnEscape
                    blurOnSelect
                    sx={{
                        marginRight: {
                            sm: 4,
                            xs: 0,
                        },
                    }}
                    onChange={(_, card) =>
                        handleSelectCard(_, card ? card : undefined)
                    }
                    options={enchancedCards.sort(
                        (card1, card2) =>
                            card1.columnOrderIndex - card2.columnOrderIndex
                    )}
                    noOptionsText="This Project has no Cards"
                    groupBy={(card) => card.columnName}
                    getOptionLabel={(card) => card.title}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select or Search for a Card"
                            sx={{
                                width: "325px",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "23px",
                                },
                            }}
                        />
                    )}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <GroupHeader>{params.group}</GroupHeader>
                            <GroupItems>{params.children}</GroupItems>
                        </li>
                    )}
                />
            </Grid>
            <BoardCardModal
                open={cardModal}
                close={closeCardModal}
                card={oneCard}
                setCard={setOneCard}
                projectMembers={projectMembers}
                cardResponsiblePersons={responsiblePersons}
                setCardResponsiblePersons={setResponsiblePersons}
                updateCards={updateCards}
                allCards={cards}
                setCards={setCards}
            />
        </Grid>
    );
};

export default ProjectToolbar;
