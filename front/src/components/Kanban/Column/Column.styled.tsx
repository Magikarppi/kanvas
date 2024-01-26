import styled from "styled-components";
import { Dropshadow } from "../Board/Board.styled";

const RowContainer = styled.div<{
    $isDraggingOver?: boolean | null;
}>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: background-color 0.2s ease;
    ${({ $isDraggingOver }) =>
        $isDraggingOver && "background-color: rgb(255,255,255,0.01);"}
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    background-color: transparent;
    margin-bottom: 10px;
`;
const Container = styled.div<{
    isDragging?: boolean;
}>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    max-width: 200px;
    min-width: 200px;
    height: calc(90vh);
    margin-right: 20px;
    flex: 1 0 auto;
    position: relative;
    ${({ isDragging }) => isDragging && "opacity: 0.6;"}
`;

const Row = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
`;

type RowDropshadowProps = {
    $marginTop: number;
};

const RowDropshadow = styled(Dropshadow)<RowDropshadowProps>`
    margin-top: ${({ $marginTop }) => `${$marginTop}px`};
`;
const DropshadowContainer = styled(RowContainer)`
    width: auto;
    position: absolute;
`;

export {
    RowContainer,
    TitleContainer,
    Container,
    Row,
    RowDropshadow,
    DropshadowContainer,
};
