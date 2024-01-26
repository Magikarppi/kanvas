import { FC, ReactNode, useState, createContext, useContext } from "react";
import { DragStart, DragUpdate, DropResult } from "react-beautiful-dnd";
import {
    TColumn,
    TDragDropProps,
    TRowDropshadowProps,
    TColumnDropshadowProps,
    TRowDropshadow,
    TColDropshadow,
    TDragDropContextProps,
} from "../../models/kanbanModels";
import columnsService from "../../services/columnsService";
import { IProjectColumn } from "../../models/projectModels";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const DragNDropContext = createContext<TDragDropContextProps | undefined>(
    undefined
);

const getDraggedElement = (draggableId: number) => {
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedElement = document.querySelector(domQuery);
    return draggedElement;
};

const getUpdatedChildrenArray = (
    draggedElement: Element,
    destinationIndex: number,
    sourceIndex: number
) => {
    const child: Element[] = [...draggedElement!.parentNode!.children];

    if (destinationIndex === sourceIndex) return child;
    const draggedItem = child[sourceIndex];

    child.splice(sourceIndex, 1);

    return child.splice(0, destinationIndex, draggedItem);
};

const getStyle = (
    updatedChildrenArray: Element[],
    destinationIndex: number,
    property: string,
    clientDirection: "clientHeight" | "clientWidth"
) =>
    updatedChildrenArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr) as CSSStyleDeclaration;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const prop = parseFloat((style as any)[property]);
        return total + curr[clientDirection] + prop;
    }, 0);

const DragNDropProvider: FC<{
    children: ReactNode;
    data: TColumn[];
    projectId: string;
    token: string;
}> = ({ children, data, projectId, token }) => {
    const [columns, setColumns] = useState<TColumn[]>(data);
    const [colDropshadowProps, setColDropshadowProps] =
        useState<TColDropshadow>({
            marginLeft: 0,
            height: 0,
        });
    const [rowDropshadowProps, setRowDropshadowProps] =
        useState<TRowDropshadow>({
            marginTop: 0,
            height: 0,
        });

    const moveRowSameColumn: TDragDropProps = (source, destination) => {
        setColumns((prev) => {
            const updated = [...prev];
            const [{ tasks }] = updated.filter(
                ({ id }) => id === source.droppableId
            );
            const [removed] = tasks.splice(source.index, 1);

            tasks.splice(destination.index, 0, removed);
            return updated;
        });
    };

    const moveRowDifferentColumn: TDragDropProps = (source, destination) => {
        setColumns((prev) => {
            const updated = [...prev];
            const [sourceColumn] = updated.filter(
                ({ id }) => id === source.droppableId
            );
            const [destinationColumn] = updated.filter(
                ({ id }) => id === destination.droppableId
            );

            const sourceRow = sourceColumn.tasks;
            const destinationRow = destinationColumn.tasks;

            const [removed] = sourceRow.splice(source.index, 1);

            destinationRow.splice(destination.index, 0, removed);

            return updated;
        });
    };

    const handleRowMove: TDragDropProps = (source, destination) => {
        if (source.droppableId !== destination.droppableId) {
            moveRowDifferentColumn(source, destination);
        } else {
            moveRowSameColumn(source, destination);
        }
    };

    const handleColumnMove: TDragDropProps = (source, destination) =>
        setColumns((prev) => {
            const updated = [...prev];
            const [removed] = updated.splice(source.index, 1);

            updated.splice(destination.index, 0, removed);
            return updated;
        });

    const handleDropshadowRow: TRowDropshadowProps = (
        event,
        destinationIndex,
        sourceIndex
    ) => {
        const draggedElement = getDraggedElement(event.draggableId);

        if (!draggedElement) return;

        const { clientHeight } = draggedElement as Element;

        const updatedChildrenArray: Element[] = getUpdatedChildrenArray(
            draggedElement as Element,
            destinationIndex,
            sourceIndex
        );

        const marginTop = getStyle(
            updatedChildrenArray,
            destinationIndex,
            "marginBottom",
            "clientHeight"
        );

        setRowDropshadowProps({
            height: clientHeight + 2,
            marginTop: marginTop + 2 * destinationIndex,
        });
    };

    const handleDropshadowColumn: TColumnDropshadowProps = (
        event,
        destinationIndex,
        sourceIndex
    ) => {
        const draggedElement: Element | Node | null = getDraggedElement(
            event.draggableId
        )!.parentNode!.parentNode;

        if (!draggedElement) return;

        const { clientHeight } = draggedElement as Element;

        const updatedChildrenArray: Element[] = getUpdatedChildrenArray(
            draggedElement as Element,
            destinationIndex,
            sourceIndex
        );

        const marginLeft = getStyle(
            updatedChildrenArray,
            destinationIndex,
            "marginRight",
            "clientWidth"
        );

        setColDropshadowProps({
            height: clientHeight,
            marginLeft,
        });
    };

    const handleDragUpdate = (event: DragUpdate) => {
        const { source, destination } = event;
        if (!destination) return;

        if (event.type === "column") {
            handleDropshadowColumn(event, destination.index, source.index);
        } else {
            handleDropshadowRow(event, destination.index, source.index);
        }
    };

    const handleDragStart = (event: DragStart) => {
        const { index } = event.source;
        if (event.type === "column") {
            handleDropshadowColumn(event, index, index);
        } else {
            handleDropshadowRow(event, index, index);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === "all-columns") {
            handleColumnMove(source, destination);
        } else {
            handleRowMove(source, destination);
        }
    };

    const handleDeleteColumn = (colIndex: number) =>
        setColumns((prev) => {
            const updated = [...prev];
            updated.filter((dat, rowIndex) => rowIndex !== colIndex);
            return updated;
        });

    const onSubmit = (newRow: string, colIndex: number) => {
        setColumns((prev) => {
            const updated = [...prev];
            updated[colIndex].tasks.push({
                title: newRow,
                id: Math.random().toString(),
            });
            return updated;
        });
    };

    const handleRemoveTask = (rowIndex: number, colIndex: number) => {
        setColumns((prev) => {
            const updated = [...prev];
            updated[colIndex].tasks.splice(rowIndex, 1);
            return updated;
        });
    };

    const handleDuplicateTask = (rowIndex: number, colIndex: number) => {
        setColumns((prev) => {
            const updated = [...prev];
            updated[colIndex].tasks.push({
                title: updated[colIndex].tasks[rowIndex].title,
                id: Math.random().toString(),
            });
            return updated;
        });
    };

    const handleNewColumn = async (newName: string) => {
        const newColumn: Omit<IProjectColumn, "id"> = {
            columnName: newName,
            projectId: projectId,
            orderIndex: columns.length,
        };

        try {
            const addedColumn = await columnsService.addColumn(
                token,
                newColumn
            );

            // ToDO: figure out what to do with the tasks array
            if (addedColumn) {
                setColumns((prevColumns) => {
                    const columnToAdd = {
                        id: addedColumn.id,
                        projectId: addedColumn.projectId,
                        title: addedColumn.columnName,
                        orderIndex: addedColumn.orderIndex,
                        tasks: [],
                    };
                    return [...prevColumns, columnToAdd];
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        }
    };

    return (
        <DragNDropContext.Provider
            value={{
                onSubmit,
                handleDuplicateTask,
                handleNewColumn,
                handleRemoveTask,
                handleDeleteColumn,
                handleDragEnd,
                handleDragStart,
                handleDragUpdate,
                rowDropshadowProps,
                colDropshadowProps,
                columns,
                setColumns,
                token,
                projectId,
            }}
        >
            {children}
        </DragNDropContext.Provider>
    );
};

export function useDragDrop() {
    const context = useContext(DragNDropContext);
    if (context === undefined) {
        throw new Error("useDragDrop must be used inside DragDropProvider");
    }

    return context;
}

export default DragNDropProvider;
