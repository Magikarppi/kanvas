import { Dispatch, SetStateAction } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

type TTask = {
    id: string;
    title: string;
};

type TColumn = {
    id: string;
    title: string;
    tasks: TTask[];
};

type TKanbanBoard = {
    columns: TColumn[];
};

type TDragDropProps = (
    source: DraggableLocation,
    destination: DraggableLocation
) => void;

// handle the manipulation of placeholder for row
type TRowDropshadowProps = (
    event: any,
    destinationIndex: number,
    sourceIndex: number
) => void;

// handle the manipulation of placeholder for column
type TColumnDropshadowProps = (
    event: any,
    destinationIndex: number,
    sourceIndex: number
) => void;

type TRowDropshadow = { marginTop: number; height: number };
type TColDropshadow = { marginLeft: number; height: number };

type TDragDropContextProps = {
    onSubmit: (newRow: string, colIndex: number) => void;
    handleDuplicateTask: (rowIndex: number, colIndex: number) => void;
    handleNewColumn: (newName: string) => void;
    handleRemoveTask: (rowIndex: number, colIndex: number) => void;
    handleDeleteColumn: (colIndex: number) => void;
    handleDragEnd: (result: DropResult) => void;
    handleDragStart: (event: any) => void;
    handleDragUpdate: (event: any) => void;
    rowDropshadowProps: TRowDropshadow;
    colDropshadowProps: TColDropshadow;
    columns: TColumn[];
    setColumns: Dispatch<SetStateAction<TColumn[]>>;
};

export type {
    TTask,
    TColumn,
    TKanbanBoard,
    TDragDropProps,
    TRowDropshadowProps,
    TColumnDropshadowProps,
    TRowDropshadow,
    TColDropshadow,
    TDragDropContextProps,
};
