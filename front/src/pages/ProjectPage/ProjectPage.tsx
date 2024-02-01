import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Divider } from "@mui/material";
import { toast } from "react-toastify";

import ProjectHeader from "../../components/Project/ProjectHeader/ProjectHeader";
import ProjectToolbar from "../../components/Project/ProjectToolbar/ProjectToolbar";

import projectService from "../../services/projectService";
import { selectToken } from "../../redux/hooks";
import {
    IProject,
    IProjectColumn,
    ProjectMember,
} from "../../models/projectModels";
import { ICard } from "../../models/cardModels";

import { AxiosError } from "axios";
import DragDrop from "../../components/Kanban/DragDrop";

const ProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = selectToken() as string;

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<IProject>();
    const [columns, setColumns] = useState<IProjectColumn[]>([]);
    const [cards, setCards] = useState<ICard[]>([]);
    const [members, setMembers] = useState<ProjectMember[]>([]);

    useEffect(() => {
        const fetchProject = async () => {
            if (token) {
                try {
                    const projectData = await projectService.getProjectById(
                        token,
                        id as string
                    );
                    setLoading(false);
                    setProject(projectData.project);
                    setColumns(projectData.projectColumns);
                    setCards(projectData.cards);
                    setMembers(projectData.projectMembers);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error?.response?.data);
                        navigate("/dashboard");
                    }
                }
            } else {
                navigate("/sign-in");
                toast.error("Please sign in to access this page");
            }
        };
        fetchProject();
    }, [id]);

    const handleNewColumn = (newColumn: IProjectColumn) => {
        setColumns((prevColumns) => {
            return [...prevColumns, newColumn];
        });
    };

    const handleUpdateColumns = (updatedColumn: IProjectColumn) => {
        setColumns((prevData) => {
            const prevColumns = [...prevData];
            const originalColumn = prevColumns.find(
                (col) => col.id === updatedColumn.id
            );

            if (!originalColumn) {
                console.log("no original column found");
                return prevData;
            }

            prevColumns.forEach((col) => {
                if (originalColumn.orderIndex > updatedColumn.orderIndex) {
                    if (
                        col.orderIndex >= updatedColumn.orderIndex &&
                        col.orderIndex < originalColumn.orderIndex
                    ) {
                        col.orderIndex++;
                    }
                } else if (
                    originalColumn.orderIndex < updatedColumn.orderIndex
                ) {
                    if (
                        col.orderIndex > originalColumn.orderIndex &&
                        col.orderIndex <= updatedColumn.orderIndex
                    ) {
                        col.orderIndex--;
                    }
                }
            });

            return prevColumns.map((col) =>
                col.id === updatedColumn.id ? updatedColumn : col
            );
        });
    };

    const handleUpdateCards = (updatedCard: ICard) => {
        setCards((prevData) => {
            const prevCards = [...prevData];

            // original card that is updated (updatedCard)
            const originalCard = prevCards.find(
                (card) => card.id === updatedCard.id
            );

            const originalCardIndex = prevCards.findIndex(
                (card) => card.id === updatedCard.id
            );

            if (!originalCard) {
                console.log("no originalCard found");
                return prevData;
            }

            const inSameColumn = updatedCard.inColumn === originalCard.inColumn;
            if (inSameColumn) {
                // card dragged in the same column
                const movedCard = prevCards.splice(originalCardIndex, 1)[0];

                prevCards.forEach((card) => {
                    if (movedCard.orderIndex > updatedCard.orderIndex) {
                        if (
                            card.orderIndex >= updatedCard.orderIndex &&
                            card.orderIndex < movedCard.orderIndex
                        ) {
                            card.orderIndex++;
                        }
                    } else if (movedCard.orderIndex < updatedCard.orderIndex) {
                        if (
                            card.orderIndex > movedCard.orderIndex &&
                            card.orderIndex <= updatedCard.orderIndex
                        ) {
                            card.orderIndex--;
                        }
                    }
                });

                movedCard.orderIndex = updatedCard.orderIndex;

                prevCards.splice(updatedCard.orderIndex, 0, movedCard);
                return prevCards;
            } else {
                // card dragged from one column to another
                const cardsInNewColumn = prevCards.filter(
                    (card) => card.inColumn === updatedCard.inColumn
                );
                const cardsInOldColumn = cards.filter(
                    (card) => card.inColumn === originalCard.inColumn
                );

                // update orderIndexes in the column where a card was dragged from
                cardsInOldColumn.forEach((card) => {
                    if (card.orderIndex > originalCard.orderIndex) {
                        card.orderIndex--;
                    }
                });

                // update orderIndexes in the column where a card was dragged to
                cardsInNewColumn.forEach((card) => {
                    if (card.orderIndex >= updatedCard.orderIndex) {
                        card.orderIndex++;
                    }
                });

                // remove dragged card from the old column
                cardsInOldColumn.splice(
                    cardsInOldColumn.findIndex(
                        (card) => card.id === originalCard.id
                    ),
                    1
                );

                // insert the draged card into the new column
                cardsInNewColumn.splice(updatedCard.orderIndex, 0, updatedCard);

                // keep the rest of the columns along
                const restOfCards = prevCards.filter(
                    (card) =>
                        !cardsInOldColumn
                            .map((oldCard) => oldCard.id)
                            .includes(card.id) &&
                        !cardsInNewColumn
                            .map((newCard) => newCard.id)
                            .includes(card.id)
                );

                // return untouched and updated columns
                return [
                    ...restOfCards,
                    ...cardsInOldColumn,
                    ...cardsInNewColumn,
                ];
            }
        });
    };

    return loading === true ? null : (
        <div>
            <ProjectHeader projectInfo={project} projectMembers={members} />
            <Divider style={{ marginTop: "20px" }} />
            <ProjectToolbar />
            <Divider style={{ marginBottom: "20px" }} />
            <DragDrop
                columns={columns}
                cards={cards}
                addNewColumn={handleNewColumn}
                updateColumns={handleUpdateColumns}
                updateCards={handleUpdateCards}
                projectId={id as string}
                token={token}
            />
        </div>
    );
};

export default ProjectPage;
