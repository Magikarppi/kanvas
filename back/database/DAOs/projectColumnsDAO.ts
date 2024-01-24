import { executeMultipleQueries, executeQuery } from "../database-service";
import {
    deleteProjectColumn,
    getProjectColumn,
    getProjectColumns,
    insertProjectColumn,
    updateProjectColumn,
} from "../queries/projectColumnsQueries";
import { IParametrizedQuery, IProjectColumnDB } from "../utils/interfaces";

const checkOrderIndex = (
    projectColumns: IProjectColumnDB[],
    orderIndex: number,
    isInsert: boolean
) => {
    let checkedOrderIndex;

    if (isInsert) {
        checkedOrderIndex = Math.max(
            0,
            Math.min(orderIndex, projectColumns.length)
        );
    } else {
        checkedOrderIndex = Math.max(
            0,
            Math.min(
                orderIndex,
                projectColumns.length === 1
                    ? projectColumns.length
                    : projectColumns.length - 1
            )
        );
    }
    return checkedOrderIndex;
};

type TOperation = "update" | "delete" | "insert";

const updateColumnIndexes = (
    projectColumns: IProjectColumnDB[],
    idToMove: string,
    newOrderIndex: number,
    operation: TOperation
) => {
    if (operation === "insert") {
        const checkedOrderIndex = checkOrderIndex(
            projectColumns,
            newOrderIndex,
            true
        );
        projectColumns.forEach((obj) => {
            if (obj.order_index >= checkedOrderIndex) {
                obj.order_index++;
            }
        });
        return projectColumns;
    }
    const checkedOrderIndex = checkOrderIndex(
        projectColumns,
        newOrderIndex,
        false
    );

    const indexToMove = projectColumns.findIndex((obj) => obj.id === idToMove);

    if (indexToMove === -1) {
        console.error(
            `Object with id ${idToMove} not found in the projectColumns.`
        );
        return projectColumns;
    }

    const movedObject = projectColumns.splice(indexToMove, 1)[0];

    projectColumns.forEach((obj) => {
        if (operation === "update") {
            if (movedObject.order_index > checkedOrderIndex) {
                if (
                    obj.order_index >= checkedOrderIndex &&
                    obj.order_index < movedObject.order_index
                ) {
                    obj.order_index++;
                }
            } else if (movedObject.order_index < checkedOrderIndex) {
                if (
                    obj.order_index > movedObject.order_index &&
                    obj.order_index <= checkedOrderIndex
                ) {
                    obj.order_index--;
                }
            }
        } else if (operation === "delete") {
            if (obj.order_index >= checkedOrderIndex) {
                obj.order_index--;
            }
        }
    });

    movedObject.order_index = checkedOrderIndex;

    projectColumns.splice(checkedOrderIndex, 0, movedObject);

    return projectColumns;
};

const updateColumnName = (
    projectColumns: IProjectColumnDB[],
    id: string,
    columnName: string
) => {
    const columnToUpdate = projectColumns.find((col) => col.id === id);
    if (!columnToUpdate) {
        console.error(`Object with id ${id} not found in the projectColumns.`);
        return projectColumns;
    }
    columnToUpdate.column_name = columnName;
    return projectColumns;
};

const getColumnUpdateQueries = (columns: IProjectColumnDB[]) => {
    const queries: IParametrizedQuery[] = [];

    for (const column of columns) {
        queries.push({
            query: updateProjectColumn,
            parameters: [column.column_name, column.order_index, column.id],
        });
    }

    return queries;
};

const handleColumnOperation = async (
    projectId: string,
    id: string,
    orderIndex: number,
    operation: TOperation,
    columnName?: string
): Promise<IProjectColumnDB[] | null> => {
    const existingColumns = await executeQuery(getProjectColumns, [projectId]);

    if (!existingColumns) {
        return null;
    }

    const updatedExistingColumns = updateColumnIndexes(
        existingColumns.rows,
        id,
        orderIndex,
        operation
    );

    if (operation === "update" && columnName) {
        updateColumnName(updatedExistingColumns, id, columnName);
    }

    const queries = getColumnUpdateQueries(updatedExistingColumns);

    if (operation === "insert") {
        queries.push({
            query: insertProjectColumn,
            parameters: [
                id,
                projectId,
                columnName,
                checkOrderIndex(existingColumns.rows, orderIndex, true),
            ],
        });
    } else if (operation === "delete") {
        queries.push({ query: deleteProjectColumn, parameters: [id] });
    }

    const results = await executeMultipleQueries(...queries);

    if (!results || results.some((result) => !result)) {
        return null;
    }

    const updatedColumnsResult = await executeQuery(getProjectColumns, [
        projectId,
    ]);

    if (!updatedColumnsResult) {
        return null;
    }

    return updatedColumnsResult.rows as IProjectColumnDB[];
};

export const insertProjectColumnDAO = async (
    id: string,
    projectId: string,
    columnName: string,
    orderIndex: number
): Promise<IProjectColumnDB | null> => {
    const updatedColumns = await handleColumnOperation(
        projectId,
        id,
        orderIndex,
        "insert",
        columnName
    );
    if (updatedColumns) {
        const insertProjectColumn = updatedColumns.find((col) => col.id === id);
        return insertProjectColumn || null;
    } else {
        return null;
    }
};

export const updateProjectColumnDAO = async (
    id: string,
    projectId: string,
    columnName: string,
    orderIndex: number
): Promise<IProjectColumnDB[] | null> => {
    return handleColumnOperation(
        projectId,
        id,
        orderIndex,
        "update",
        columnName
    );
};

export const deleteProjectColumnDAO = async (
    id: string,
    projectId: string,
    orderIndex: number
): Promise<IProjectColumnDB[] | null> => {
    return handleColumnOperation(projectId, id, orderIndex, "delete");
};

export const getProjectColumnsDAO = async (id: string) => {
    const columns = await executeQuery(getProjectColumns, [id]);
    if (columns) {
        return columns.rows;
    }
};

export const getProjectColumnDAO = async (id: string) => {
    const result = await executeQuery(getProjectColumn, [id]);
    if (!result) {
        return null;
    }
    return result.rows[0];
};
