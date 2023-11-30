import React from "react";
import DragNDropProvider from "../../components/Kanban/DragNDropProvider";
import Board from "../../components/Kanban/Board/Board";

import data from "../../utils/DNDDummyData";

const ProjectPage = () => {
    return (
        <div>
            <DragNDropProvider data={data.columns}>
                <Board />
            </DragNDropProvider>
        </div>
    );
};

export default ProjectPage;
